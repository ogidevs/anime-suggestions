// components/AnimeDialog.jsx
import React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const AnimeDialog = ({ isDialogOpen, animeInfo, closeDialog }) => {
  const { t } = useTranslation();
  const [characters, setCharacters] = useState([]);

  if (!isDialogOpen) return null;
  const fetchAnimeCharacters = async () => {
    fetch(`https://api.jikan.moe/v4/anime/${animeInfo.id}/characters`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setCharacters(data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={() => closeDialog()}
    >
      <div
        className="bg-white p-6 m-6 rounded-lg shadow-lg sm:w-full md:w-2/3 text-center fadeIn"
        onClick={(e) => e.stopPropagation()}
        style={{ maxHeight: "80vh", overflowY: "auto" }}
      >
        <h2 className="text-2xl font-bold mb-2">{animeInfo.title}</h2>
        <p className="text-justify lg:text-base">{animeInfo.content}</p>
        <p className="block my-4 border-b border-gray-300"></p>
        <p>
          {t("animeDialog.watchAnime")}:{" "}
          {animeInfo.trailer.url !== null && (
            <a
              href={animeInfo.trailer.url}
              target="_blank"
              className="text-blue-500 hover:underline"
            >
              ({t("animeDialog.trailer")})
            </a>
          )}
        </p>
        <div className="flex flex-wrap justify-center">
          <p className="flex">
            {" "}
            <a
              href={`https://anicrush.to/search?keyword=${animeInfo.title}`}
              target="_blank"
              className="text-blue-500 hover:underline"
            >
              {" "}
              {t("animeDialog.aniCrush")}
            </a>
          </p>
        </div>
        {characters.length === 0 && (
          <>
            <button
              className="btn btn-primary mt-4"
              onClick={() => fetchAnimeCharacters()}
            >
              {t("animeDialog.animeCharacters")}
            </button>
          </>
        )}
        <div className="my-4 flex flex-wrap justify-center">
          {characters.map((data, index) => (
            <div
              key={`${data.character.mal_id}-${index}`}
              className="flex flex-col items-center mx-4 my-2"
            >
              <img
                src={data.character.images?.webp?.image_url}
                alt={data.character.name}
                loading="lazy"
                width="100"
                height="100"
                className="rounded-lg shadow-md mx-auto"
              />
              <p className="text-lg font-bold">{data.character.name}</p>
              <p className="text-sm">{data.role}</p>
            </div>
          ))}
        </div>
        <button className="btn btn-error mt-4" onClick={() => closeDialog()}>
          {t("animeDialog.close")}
        </button>
      </div>
    </div>
  );
};

export default AnimeDialog;
