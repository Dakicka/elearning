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
  const [xp, setXp] = useState(0);

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

  useEffect(() => {
    console.log("avatarFormState", avatarFormState.isDirty);
  }, [avatarFormState.isDirty]);

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

  // get user xp
  useEffect(() => {
    user && api.getUserXp(user.$id).then((res) => setXp(res));
  }, [user]);

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
        })
        .then(() => location.reload());
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
      <div className=" p-4">
        <div className="max-w-md w-full-md mx-auto">
          <div className="px-4 bg-gray-600 rounded-lg p-5 ">
            <h3 className="text-lg font-medium leading-6 text-white">Profil</h3>
            <p className="mt-1 text-sm text-white">
              Schau dir dein Profil an, ändere dein Avatar oder deine
              Klassenstufe.
            </p>
          </div>
        </div>
        <div className="max-w-md w-full-md mx-auto px-5 my-5">
          <p className="text-center">Level: {Math.floor(1 + xp / 1000)}</p>
          <progress
            className="progress progress-secondary"
            value={(xp % 1000) / 1000}
            max="1"
          ></progress>
          <p className="text-center">XP: {xp}</p>
        </div>
      </div>
      <div className="md:col-span-2 p-4 pt-0">
        <form onSubmit={onSubmit}>
          <div className="shadow sm:rounded-md sm:overflow-hidden">
            <FormContainer>
              <h4 className="text-md font-medium leading-6 text-white">
                Profilbild
              </h4>
              <br />
              <div className="grid grid-cols-2 justify-items-center items-center">
                <img src={avatar} alt="Avatar" />
                <label>
                  <input
                    type="file"
                    {...registerAvatar("avatarFile")}
                    style={{ display: "none" }}
                  />
                  <a>Ändern</a>
                </label>
              </div>
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

            <div className="py-3 bg-gray-600 text-right sm:px-6 mt-4 rounded-lg max-w-md w-full-md mx-auto px-5">
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
    </>
  );
}

export default Profile;
