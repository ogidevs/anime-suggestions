import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  GiFragmentedSword,
  GiRunningNinja,
  GiGreekTemple,
  GiMagnifyingGlass,
  GiDramaMasks,
  GiHeartBeats,
  GiFairyWand,
  GiGhost,
  GiSlicedBread,
  GiLoveMystery,
  GiSoccerBall,
  GiSchoolBag,
  GiSpaceship,
  GiImpLaugh,
  GiSuspicious,
} from "react-icons/gi";
import { MdOutlineSportsMartialArts, MdBoy } from "react-icons/md";

import InitialLoad from "./components/InitalLoad";
import ThemeToggle from "./components/ThemeToggle";
import LanguageToggle from "./components/LanguageToggle";
import AnimeList from "./components/AnimeList";
import AnimeDialog from "./components/AnimeDialog";
import GenreSelector from "./components/GenreSelector";
import TypeSelector from "./components/TypeSelector";
import KeywordsSelector from "./components/KeywordsSelector";

import "./App.css";
import Brand from "./components/Brand";

const App = () => {
  const { t } = useTranslation();
  const [animeList, setAnimeList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [initalLoad, setInitialLoad] = useState(true);
  const [animeLoading, setAnimeLoading] = useState(false);
  const [noMoreData, setNoMoreData] = useState(false);
  const [selectedMood, setSelectedMood] = useState("modern");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [isAnimeDialogOpen, setIsAnimeDialogOpen] = useState(false);
  const [animeInfo, setAnimeInfo] = useState({ title: "", content: "" });
  const imageRef = useRef(null);

  const genres = [
    {
      name: t("genreSelector.genres.action"),
      value: "1",
      icon: <GiFragmentedSword />,
    },
    {
      name: t("genreSelector.genres.adventure"),
      value: "2",
      icon: <GiRunningNinja />,
    },
    {
      name: t("genreSelector.genres.comedy"),
      value: "4",
      icon: <GiImpLaugh />,
    },
    {
      name: t("genreSelector.genres.mythology"),
      value: "6",
      icon: <GiGreekTemple />,
    },
    {
      name: t("genreSelector.genres.mystery"),
      value: "7",
      icon: <GiMagnifyingGlass />,
    },
    {
      name: t("genreSelector.genres.drama"),
      value: "8",
      icon: <GiDramaMasks />,
    },
    {
      name: t("genreSelector.genres.ecchi"),
      value: "9",
      icon: <GiHeartBeats />,
    },
    {
      name: t("genreSelector.genres.fantasy"),
      value: "10",
      icon: <GiFairyWand />,
    },
    { name: t("genreSelector.genres.horror"), value: "14", icon: <GiGhost /> },
    {
      name: t("genreSelector.genres.sliceOfLife"),
      value: "36",
      icon: <GiSlicedBread />,
    },
    {
      name: t("genreSelector.genres.romance"),
      value: "22",
      icon: <GiLoveMystery />,
    },
    {
      name: t("genreSelector.genres.sports"),
      value: "30",
      icon: <GiSoccerBall />,
    },
    {
      name: t("genreSelector.genres.suspense"),
      value: "41",
      icon: <GiSuspicious />,
    },
    {
      name: t("genreSelector.genres.martialArts"),
      value: "17",
      icon: <MdOutlineSportsMartialArts />,
    },
    {
      name: t("genreSelector.genres.school"),
      value: "23",
      icon: <GiSchoolBag />,
    },
    {
      name: t("genreSelector.genres.sciFi"),
      value: "24",
      icon: <GiSpaceship />,
    },
    { name: t("genreSelector.genres.shounen"), value: "27", icon: <MdBoy /> },
  ];

  const fetchAnime = () => {
    const genresQuery =
      selectedGenres.length === 0 ? "" : `&genres=${selectedGenres.join(",")}`;
    const keywordQuery =
      selectedKeywords.length === 0 ? "" : `&q=${selectedKeywords.join(",")}`;
    const apiUrl =
      `https://api.jikan.moe/v4/anime?page=${currentPage}${genresQuery}${keywordQuery}&limit=9&order_by=score&sort=desc` +
      (selectedMood === "modern"
        ? `&start_date=2010-01-01`
        : `&end_date=2005-01-01`);

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        if (data.pagination?.has_next_page === false) {
          setNoMoreData(true);
        }
        setAnimeList((prev) => [...prev, ...data.data]);
        setAnimeLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toast.error(t("error.fetchingData") + ": " + error.message);
        setAnimeLoading(false);
      });
  };

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      if (!animeLoading && !noMoreData && animeList.length > 0) {
        setCurrentPage((prev) => prev + 1);
        setAnimeLoading(true);
      }
    }
  };

  const handleGenreToggle = (genre) => {
    setSelectedGenres((prevSelected) =>
      prevSelected.includes(genre)
        ? prevSelected.filter((g) => g !== genre)
        : [...prevSelected, genre]
    );
  };

  const handleKeywordSelect = (keyword) => {
    setSelectedKeywords((prevSelected) =>
      prevSelected.includes(keyword)
        ? prevSelected.filter((s) => s !== keyword)
        : [...prevSelected, keyword]
    );
  };

  const handleKeywordDelete = (keyword, all = false) => {
    if (all) {
      setSelectedKeywords([]);
      return;
    }
    setSelectedKeywords((prevSelected) =>
      prevSelected.filter((s) => s !== keyword)
    );
  };

  const handleSubmit = () => {
    setCurrentPage(1);
    setNoMoreData(false);
    setAnimeList([]);
    setAnimeLoading(true);
  };

  const handleImageClick = (e) => {
    imageRef.current = e.target;
    if (imageRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        imageRef.current.requestFullscreen();
      }
    }
  };

  const handleClickOutside = (event) => {
    if (document.fullscreenElement) {
      const target = event.target;
      if (!imageRef.current.contains(target)) {
        document.exitFullscreen();
      }
    }
  };
  const openAnimeDialog = (id, title, content, trailer) => {
    setAnimeInfo({ id, title, content, trailer });
    setIsAnimeDialogOpen(true);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [animeLoading]);

  useEffect(() => {
    if (
      (selectedGenres.length !== 0 || selectedKeywords.length !== 0) &&
      currentPage > 0 &&
      animeLoading
    ) {
      fetchAnime();
    }
  }, [animeLoading]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => setInitialLoad(false), 1500);
  }, []);
  if (initalLoad) {
    return <InitialLoad />;
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between space-x-4 my-2">
        <ThemeToggle />
        <LanguageToggle />
      </div>
      <Brand />
      <TypeSelector
        selectedMood={selectedMood}
        setSelectedMood={setSelectedMood}
      />
      <GenreSelector
        genres={genres}
        selectedGenres={selectedGenres}
        handleGenreToggle={handleGenreToggle}
      />
      <KeywordsSelector
        selectedKeywords={selectedKeywords}
        handleKeywordSelect={handleKeywordSelect}
        handleKeywordDelete={handleKeywordDelete}
      />
      <button
        disabled={selectedGenres.length === 0 && selectedKeywords.length === 0}
        className="btn btn-primary my-5 mx-auto block"
        onClick={handleSubmit}
      >
        {t("submit")}
      </button>
      <AnimeList
        animeList={animeList}
        currentPage={currentPage}
        noMoreData={noMoreData}
        openAnimeDialog={openAnimeDialog}
        handleImageClick={handleImageClick}
      />
      {isAnimeDialogOpen && (
        <AnimeDialog
          isDialogOpen={isAnimeDialogOpen}
          animeInfo={animeInfo}
          closeDialog={() => setIsAnimeDialogOpen(false)}
        />
      )}
      {animeLoading && (
        <div className="my-4 mx-auto justify-center flex">
          <AiOutlineLoading3Quarters />
        </div>
      )}
      <ToastContainer position="top-center" autoClose={3000} theme="dark" />
      <footer className="text-center my-8">
        <p>
          {t("footer")}{" "}
          <a
            href={t("footerLink")}
            target="_blank"
            className="text-blue-500 hover:underline"
          >
            {" "}
            {t("author")}
          </a>
        </p>
      </footer>
    </div>
  );
};

export default App;
