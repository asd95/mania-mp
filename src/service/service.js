class Service {
  _apiBase = "https://api.rawg.io/api/";
  _apiKey = "9a9bb7bb30284fa5b70acc626cd64933";

  getResource = async (url) => {
    const res = await fetch(`${this._apiBase}${url}&key=${this._apiKey}`, {
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Build non-commerce project for my portfolio",
      },
    });

    if (!res.ok) {
      throw new Error(`Could not fetch ${res.url}, received ${res.status}`);
    }
    return res.json();
  };

  // async function which get needed data
  getPopularGames = async () => {
    const result = await this.asyncFuncUtility(
      this.createPopularGamesURL,
      "currentDate",
      "lastYear"
    );
    return result;
  };

  getNewGames = async () => {
    const result = await this.asyncFuncUtility(
      this.createNewGamesURL,
      "currentDate",
      "lastYear"
    );
    return result;
  };

  getUpcomingGames = async () => {
    const result = await this.asyncFuncUtility(
      this.createUpcomingGamesURL,
      "currentDate",
      "nextYear"
    );
    return result;
  };

  getGameDetails = async (id) => {
    const data = await this.getResource(`games/${id}?`);
    const screenshots = await this.getResource(`games/${id}/screenshots?`);
    return {
      ...data,
      screenshots,
    };
  };

  getSearchGame = async (gameName) => {
    const result = await this.getResource(`games?search=${gameName}&page_size=9`);
    return result;
  }

  // UTILITY FUNCTIONS

  async asyncFuncUtility(urlFunc, dateOne, dateTwo) {
    const date = this.getDate();
    const res = await this.getResource(urlFunc(date[dateOne], date[dateTwo]));
    return res;
  }

  getDate() {
    const currentYear = new Date().getFullYear();
    const currentMonth = String(new Date().getMonth() + 1).padStart(2, "0");
    const currentDay = String(new Date().getDate()).padStart(2, "0");

    const currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
    const lastYear = `${currentYear - 1}-${currentMonth}-${currentDay}`;
    const nextYear = `${currentYear + 1}-${currentMonth}-${currentDay}`;
    return {
      currentDate,
      lastYear,
      nextYear,
    };
  }

  createPopularGamesURL(currentDate, lastYear) {
    return `games?dates=${lastYear},${currentDate}&ordering=-rating&page_size=10`;
  }
  createNewGamesURL(currentDate, lastYear) {
    return `games?dates=${lastYear},${currentDate}&ordering=-released&page_size=10`;
  }
  createUpcomingGamesURL(currentDate, nextYear) {
    return `games?dates=${currentDate},${nextYear}&ordering=-added&page_size=10`;
  }
}



export default Service;