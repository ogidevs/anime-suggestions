// components/AnimeList.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import { GiTumbleweed } from "react-icons/gi";

import AnimeCard from "./AnimeCard";

const AnimeList = ({
  animeList,
  currentPage,
  noMoreData,
  openAnimeDialog,
  handleImageClick,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {animeList.map((anime, index) => (
          <AnimeCard
            key={`${anime.mal_id}-${index}`}
            anime={anime}
            openAnimeDialog={openAnimeDialog}
            handleImageClick={handleImageClick}
          />
        ))}
      </div>
      {(animeList.length === 0 && currentPage != 0) || noMoreData ? (
        <div className="text-center text-2xl font-bold mx-auto my-5">
          <h4>{t("animeList.noAnime")}</h4>
          <p className="text-lg font-normal m-2">
            {t("animeList.noAnimeDesc")}
          </p>
          <GiTumbleweed className="text-6xl mx-auto transform hover:scale-110 transition-transform ease-in-out duration-300" />
        </div>
      ) : null}
    </>
  );
};

export default AnimeList;
