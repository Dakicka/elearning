import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { api, AppwriteProfile } from "../api/api";
import { FormContainer } from "../components/FormElements";
import FullPageSpinner from "../components/FullPageSpinner";
import { useAuth } from "../contexts/AuthContext";

interface FormData {
  grade: number;
  avatarId: string;
}

interface FormDataAvatar {
  avatarFile: FileList;
}

function Profile() {
  const [profile, setProfile] = useState<AppwriteProfile>(null!);
  const [avatar, setAvatar] = useState<string>("");
  const [profileIsLoading, setProfileIsLoading] = useState(true);
  const [avatarIsLoading, setAvatarIsLoading] = useState(true);
  const [formIsSubmitting, setFormIsSubmitting] = useState(false);
  const [avatarId, setAvatarId] = useState("");

  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<FormData>({ mode: "onSubmit" });

  const {
    register: registerAvatar,
    handleSubmit: handleAvatarUpload,
    formState: avatarFormState,
  } = useForm<FormDataAvatar>({ mode: "onSubmit" });

  // Get user profile
  useEffect(() => {
    if (user) {
      api
        .getProfile(user.$id)
        .then((res) => setProfile(res.documents[0]))
        .then(() => setProfileIsLoading(false));
    }
  }, [user]);

  // get user avatar
  useEffect(() => {
    if (profile != null && profile.avatarId != null && user) {
      setAvatarIsLoading(true);
      api
        .getUserAvatar(profile.avatarId)
        .then((res) => setAvatar(res))
        .then(() => setAvatarIsLoading(false));
    } else if (user) {
      api
        .getUserAvatarInitials(user?.name)
        .then((res) => setAvatar(res))
        .then(() => setAvatarIsLoading(false));
    }
  }, [user, profile]);

  const uploadAvatar = handleAvatarUpload(async ({ avatarFile }) => {
    if (profile.avatarId != null && profile.avatarId != "") {
      const updateResponse = await api.updateAvatar(
        avatarFile[0],
        profile.avatarId
      );
      api
        .updateProfile(profile?.$id, { avatarId: updateResponse })
        .then((res) => {
          setProfile(res);
        });
    } else {
      const updateResponse = await api.uploadFile(avatarFile[0]);
      api
        .updateProfile(profile?.$id, { avatarId: updateResponse })
        .then((res) => {
          setProfile(res);
        });
    }
  });

  const onSubmit = handleSubmit(async ({ grade }) => {
    if (avatarFormState.isDirty) {
      await uploadAvatar();
    }
    if (isDirty) {
      api.updateProfile(profile?.$id, { grade }).then((res) => {
        setProfile(res);
      });
    }
  });

  if (
    profileIsLoading ||
    avatarIsLoading ||
    avatar === "" ||
    profile === null
  ) {
    return <FullPageSpinner />;
  }
  return (
    <>
      <div>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Profile
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Hier ein kleiner Beschreibungstext
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={onSubmit}>
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <FormContainer>
                  <p>Profilbild</p>
                  <br />
                  <img src={avatar} alt="Avatar" />
                  <input type="file" {...registerAvatar("avatarFile")} />
                  <div className="divider"></div>
                  <label className="text-sm font-bold block mt-5">
                    In welche Klassestufe gehst du momentan?
                  </label>
                  <input
                    {...register("grade", {
                      validate: {
                        positive: (v) => parseInt(v as unknown as string) > 0,
                      },
                    })}
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
                    defaultValue={profile?.grade}
                  />
                </FormContainer>

                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 mt-4">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Speichern
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
