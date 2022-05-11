import { AppwriteClass } from "../api/api";

export const ClassCard: React.FC<{ awClass: AppwriteClass }> = ({
  awClass,
}) => (
  <div className="card w-96 bg-base-100 shadow-xl h-full">
    <figure>
      <img
        src="https://api.lorem.space/image/furniture?w=400&h=225"
        alt="Shoes"
      />
    </figure>
    <div className="card-body">
      <h2 className="card-title">{awClass.title}</h2>
      <p>{awClass.description}</p>
      <div className="card-actions justify-end">
        <button className="btn btn-primary bg-primary hover:bg-secondary text-black">
          Jetzt Starten
        </button>
      </div>
    </div>
  </div>
);
