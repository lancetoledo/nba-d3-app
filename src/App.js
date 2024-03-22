// App.js
import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import PlayerSelector from './components/PlayerSelector';
import BarChart from './components/BarChart';
import RadarChart from './components/RadarChart';

function App() {
  const [playersData, setPlayersData] = useState([]);
  const [selectedPlayer1, setSelectedPlayer1] = useState({});
  const [selectedPlayer2, setSelectedPlayer2] = useState({});

  const staticPlayersData = [
    {
      "idPlayer": "34160611",
      "idTeam": "134865",
      "idTeam2": "0",
      "idTeamNational": null,
      "idSoccerXML": "0",
      "idAPIfootball": null,
      "idPlayerManager": null,
      "idWikidata": null,
      "strNationality": "United States",
      "strPlayer": "Stephen Curry",
      "strPlayerAlternate": "",
      "strTeam": "Golden State Warriors",
      "strTeam2": "",
      "strSport": "Basketball",
      "intSoccerXMLTeamID": null,
      "dateBorn": "1988-03-14",
      "strNumber": "30",
      "dateSigned": null,
      "strSigning": "",
      "strWage": "",
      "strOutfitter": "",
      "strKit": "",
      "strAgent": "",
      "strBirthLocation": "Akron, Ohio",
      "strEthnicity": null,
      "strStatus": "Active",
      "strDescriptionEN": "Wardell Stephen Curry II (/ˈstɛfən/ STEF-ən; born March 14, 1988) is an American professional basketball player for the Golden State Warriors of the National Basketball Association (NBA). Widely regarded as one of the greatest basketball players of all time, and as the greatest shooter in NBA history, Curry is credited with revolutionizing the sport by inspiring teams and players to routinely utilize the three-point shot. An eight-time NBA All-Star and eight-time All-NBA selection, including four times on the first team, he has been named the NBA Most Valuable Player (MVP) twice and has won four NBA championships as well as an NBA Finals MVP Award.\r\n\r\nCurry is the son of former NBA player Dell Curry and the older brother of current NBA player Seth Curry. He played college basketball for the Davidson Wildcats, where he set the all-time scoring record for Davidson and the Southern Conference, was twice named conference player of the year, and set the single-season NCAA record during his sophomore year for most three-pointers made. Curry was selected by the Warriors with the seventh overall pick in the 2009 NBA Draft.\r\n\r\nIn 2014–15, Curry won his first league MVP award and led the Warriors to their first championship since 1975. The following season, he became the first player in NBA history to be elected MVP by a unanimous vote and was the NBA annual scoring leader while shooting above 50–40–90. That same year, the Warriors broke the record for the most wins in an NBA season en route to reaching the 2016 NBA Finals, which they lost to the Cleveland Cavaliers in seven games. Curry helped the Warriors return to the NBA Finals in 2017, 2018, 2019, and 2022, winning back-to-back titles in 2017 and 2018, being defeated by the Toronto Raptors in 2019. After missing the playoffs in consecutive seasons, Curry won a fourth ring against the Boston Celtics in 2022 and was named Finals MVP for the first time in his career.\r\n\r\nDuring the 2012–13 season, Curry set the NBA record for three-pointers made in a regular season, with 272. He surpassed that record in 2015 with 286, and again in 2016 with 402. On December 14, 2021, Curry set the NBA record for career three-pointers, surpassing Ray Allen. For their shooting abilities, Curry and teammate Klay Thompson have earned the nickname of the Splash Brothers; in 2013–14, they set the record for combined three-pointers made in an NBA season with 484, a record they broke the following season (525), and again in the 2015–16 season (678).",
      "strDescriptionDE": null,
      "strDescriptionFR": null,
      "strDescriptionCN": null,
      "strDescriptionIT": null,
      "strDescriptionJP": null,
      "strDescriptionRU": null,
      "strDescriptionES": "Wardell Stephen Curry II (nacido el 14 de marzo de 1988 en Akron, Ohio) es un jugador de baloncesto estadounidense que pertenece a la plantilla de los Golden State Warriors de la NBA. Con 1,91 metros de altura, juega en la posición de base, aunque puede jugar también de escolta. Es hijo del exjugador de la NBA Dell Curry y de la jugadora de voleibol Sonya Curry, y hermano mayor de Seth Curry.",
      "strDescriptionPT": null,
      "strDescriptionSE": null,
      "strDescriptionNL": null,
      "strDescriptionHU": null,
      "strDescriptionNO": null,
      "strDescriptionIL": null,
      "strDescriptionPL": null,
      "strGender": "Male",
      "strSide": "",
      "strPosition": "Point Guard",
      "strCollege": null,
      "strFacebook": "",
      "strWebsite": "",
      "strTwitter": "twitter.com/StephenCurry30",
      "strInstagram": "",
      "strYoutube": "",
      "strHeight": "6 ft 2 in (1.88 m)",
      "strWeight": "185 lb (84 kg)",
      "intLoved": "1",
      "strThumb": "https://www.thesportsdb.com/images/media/player/thumb/ud2nz21526816229.jpg",
      "strCutout": "https://www.thesportsdb.com/images/media/player/cutout/05mmqy1645307564.png",
      "strRender": "https://www.thesportsdb.com/images/media/player/render/bzlzt41602266358.png",
      "strBanner": null,
      "strFanart1": "https://www.thesportsdb.com/images/media/player/fanart/usysqu1432463184.jpg",
      "strFanart2": "https://www.thesportsdb.com/images/media/player/fanart/vutrxw1432463315.jpg",
      "strFanart3": "https://www.thesportsdb.com/images/media/player/fanart/xywtyw1432463445.jpg",
      "strFanart4": null,
      "strCreativeCommons": "No",
      "strLocked": "unlocked",
      "name": "Stephen Curry",
      "image": "https://www.thesportsdb.com/images/media/player/cutout/05mmqy1645307564.png",
      "id": 115,
      "seasonAverages": {
        "pts": 26.806,
        "ast": 4.919,
        "turnover": 2.903,
        "pf": 1.645,
        "fga": 19.629,
        "fgm": 8.839,
        "fta": 4.645,
        "ftm": 4.274,
        "fg3a": 11.968,
        "fg3m": 4.855,
        "reb": 4.339,
        "oreb": 0.516,
        "dreb": 3.823,
        "stl": 0.774,
        "blk": 0.355,
        "fg_pct": 0.45,
        "fg3_pct": 0.406,
        "ft_pct": 0.92,
        "min": "32:38",
        "games_played": 62,
        "player_id": 115,
        "season": 2023
      }
    },
    {
      "idPlayer": "34153733",
      "idTeam": "134867",
      "idTeam2": "0",
      "idTeamNational": null,
      "idSoccerXML": "0",
      "idAPIfootball": null,
      "idPlayerManager": null,
      "idWikidata": null,
      "strNationality": "USA",
      "strPlayer": "LeBron James",
      "strPlayerAlternate": "",
      "strTeam": "Los Angeles Lakers",
      "strTeam2": "",
      "strSport": "Basketball",
      "intSoccerXMLTeamID": null,
      "dateBorn": "1984-12-30",
      "strNumber": "23",
      "dateSigned": null,
      "strSigning": "",
      "strWage": "",
      "strOutfitter": "",
      "strKit": "Nike LeBron 16",
      "strAgent": "",
      "strBirthLocation": "Akron, Ohio",
      "strEthnicity": "Black",
      "strStatus": "Active",
      "strDescriptionEN": "LeBron Raymone James Sr. (/ləˈbrɒn/; born December 30, 1984) is an American professional basketball player for the Los Angeles Lakers in the National Basketball Association (NBA). Nicknamed \"King James,\" he is considered to be one of the greatest basketball players in history and is often compared to Michael Jordan in debates over the greatest basketball player of all time. James is the all-time leading scorer in NBA history and ranks fourth in career assists. He has won four NBA championships over three teams with the Cleveland Cavaliers, Miami Heat, and Los Angeles Lakers. James has led his teams to ten NBA Finals. He has four MVP awards, four Finals MVP awards, and two Olympic gold medals. He has been named an All-Star nineteen times, selected to the All-NBA Team eighteen times, and to the All-Defensive Team six times.\r\n\r\nJames grew up playing basketball for St. Vincent–St. Mary High School in his hometown of Akron, Ohio. He was heavily touted by the national media as a future NBA superstar. A prep-to-pro, he was selected by the Cleveland Cavaliers with the first overall pick in the 2003 NBA draft. Named the 2004 NBA Rookie of the Year, he soon established himself as one of the league's premier players, winning the NBA MVP award in 2009 and 2010 and leading the Cavaliers to their first NBA Finals appearance in 2007. After failing to win a championship with Cleveland, James left in 2010 as a free agent to join the Miami Heat; this was announced in the television special The Decision and is among the most controversial free-agent decisions in sports history.\r\n\r\nJames won his first two NBA championships while playing for the Heat in 2012 and 2013; in both of these years, he also earned the league's MVP and Finals MVP awards. After his fourth season with the Heat in 2014, James opted out of his contract to re-sign with the Cavaliers. In 2016, he led the Cavaliers to victory over the Golden State Warriors in the Finals by coming back from a 3–1 deficit, delivering the team's first championship and ending the Cleveland sports curse. In 2018, James exercised his contract option to leave the Cavaliers and signed with the Lakers, where he won the 2020 NBA championship and his fourth Finals MVP. James is also the first player in NBA history to accumulate $1 billion in earnings as an active player.\r\n\r\nOff the court, James has accumulated more wealth and fame from numerous endorsement contracts. He has been featured in books, documentaries (including winning two Sports Emmy Awards as an executive producer), and television commercials. He has won 19 ESPY Awards, hosted Saturday Night Live, and starred in the sports film Space Jam: A New Legacy (2021). James has been a part-owner of Liverpool F.C. since 2011 and leads the LeBron James Family Foundation, which has opened an elementary school, housing complex, retail plaza/community center, and medical center in Akron.",
      "strDescriptionDE": null,
      "strDescriptionFR": null,
      "strDescriptionCN": null,
      "strDescriptionIT": null,
      "strDescriptionJP": null,
      "strDescriptionRU": null,
      "strDescriptionES": null,
      "strDescriptionPT": null,
      "strDescriptionSE": null,
      "strDescriptionNL": null,
      "strDescriptionHU": null,
      "strDescriptionNO": null,
      "strDescriptionIL": null,
      "strDescriptionPL": null,
      "strGender": "Male",
      "strSide": "",
      "strPosition": "Small Forward",
      "strCollege": null,
      "strFacebook": "www.facebook.com/LeBron",
      "strWebsite": "",
      "strTwitter": "twitter.com/kingjames",
      "strInstagram": "instagram.com/kingjames",
      "strYoutube": "",
      "strHeight": "6 ft 9 in (2.06 m)",
      "strWeight": "250 lb (113 kg)",
      "intLoved": "1",
      "strThumb": "https://www.thesportsdb.com/images/media/player/thumb/ktavmk1631617010.jpg",
      "strCutout": "https://www.thesportsdb.com/images/media/player/cutout/tx6wea1702374040.png",
      "strRender": "https://www.thesportsdb.com/images/media/player/render/of2u2w1676059602.png",
      "strBanner": "https://www.thesportsdb.com/images/media/player/banner/mhqkmf1594751559.jpg",
      "strFanart1": "https://www.thesportsdb.com/images/media/player/fanart/ytyxtw1421711662.jpg",
      "strFanart2": "https://www.thesportsdb.com/images/media/player/fanart/lv4c0i1485544980.jpg",
      "strFanart3": "https://www.thesportsdb.com/images/media/player/fanart/nodykx1485545024.jpg",
      "strFanart4": "https://www.thesportsdb.com/images/media/player/fanart/3qar2c1485545072.jpg",
      "strCreativeCommons": "Yes",
      "strLocked": "unlocked",
      "name": "LeBron James",
      "image": "https://www.thesportsdb.com/images/media/player/cutout/tx6wea1702374040.png",
      "id": 237,
      "seasonAverages": {
        "pts": 25.426,
        "ast": 8.016,
        "turnover": 3.279,
        "pf": 1.23,
        "fga": 18.082,
        "fgm": 9.607,
        "fta": 5.443,
        "ftm": 4.066,
        "fg3a": 5.311,
        "fg3m": 2.148,
        "reb": 7.246,
        "oreb": 0.852,
        "dreb": 6.393,
        "stl": 1.246,
        "blk": 0.557,
        "fg_pct": 0.531,
        "fg3_pct": 0.404,
        "ft_pct": 0.747,
        "min": "35:06",
        "games_played": 61,
        "player_id": 237,
        "season": 2023
      }
    },
    {
      "idPlayer": "34161168",
      "idTeam": "134868",
      "idTeam2": "0",
      "idTeamNational": null,
      "idSoccerXML": null,
      "idAPIfootball": null,
      "idPlayerManager": null,
      "idWikidata": null,
      "strNationality": "United States",
      "strPlayer": "Kevin Durant",
      "strPlayerAlternate": "",
      "strTeam": "Phoenix Suns",
      "strTeam2": "",
      "strSport": "Basketball",
      "intSoccerXMLTeamID": null,
      "dateBorn": "1988-09-29",
      "strNumber": "35",
      "dateSigned": null,
      "strSigning": "",
      "strWage": "",
      "strOutfitter": "",
      "strKit": "",
      "strAgent": "",
      "strBirthLocation": "Washington, D.C.",
      "strEthnicity": "",
      "strStatus": "Active",
      "strDescriptionEN": "Kevin Wayne Durant (/dəˈrænt/ də-RANT; born September 29, 1988), also known by his initials KD, is an American professional basketball player for the Phoenix Suns of the National Basketball Association (NBA). He played one season of college basketball for the Texas Longhorns, and was selected as the second overall pick by the Seattle SuperSonics in the 2007 NBA draft. He played nine seasons with the franchise, which became the Oklahoma City Thunder in 2008, before signing with the Golden State Warriors in 2016, winning consecutive NBA championships in 2017 and 2018. After sustaining an Achilles injury in the 2019 finals, he joined the Brooklyn Nets as a free agent that summer. Following disagreements with the Nets' front office, he requested a trade during the 2022 offseason, and was eventually traded to the Suns in 2023. Durant is widely regarded as one of the greatest players and scorers of all time.\r\n\r\nDurant was a heavily recruited high school prospect who was widely regarded as the second-best player in his class. In college, he won numerous year-end awards and became the first freshman to be named Naismith College Player of the Year. As a professional, he has won two NBA championships, an NBA Most Valuable Player Award, two Finals MVP Awards, two NBA All-Star Game Most Valuable Player Awards, four NBA scoring titles, the NBA Rookie of the Year Award, been named to ten All-NBA teams (including six First Teams), and selected 13 times as an NBA All-Star. In 2021, Durant was named to the NBA 75th Anniversary Team. As a member of the U.S. men's national team, Durant has won three gold medals in the Olympics (2012, 2016, and 2020) and is the leading scorer in Team USA's men's Olympic basketball history. He also won gold at the 2010 FIBA World Championship.\r\n\r\nOff the court, Durant is one of the highest-earning basketball players in the world, due in part to endorsement deals with companies such as Foot Locker and Nike. He has developed a reputation for philanthropy and regularly leads the league in All-Star votes and jersey sales. In recent years, he has contributed to The Players' Tribune as both a photographer and writer. In 2012, he ventured into acting, appearing in the film Thunderstruck.",
      "strDescriptionDE": null,
      "strDescriptionFR": null,
      "strDescriptionCN": null,
      "strDescriptionIT": null,
      "strDescriptionJP": null,
      "strDescriptionRU": null,
      "strDescriptionES": null,
      "strDescriptionPT": null,
      "strDescriptionSE": null,
      "strDescriptionNL": null,
      "strDescriptionHU": null,
      "strDescriptionNO": null,
      "strDescriptionIL": null,
      "strDescriptionPL": null,
      "strGender": "Male",
      "strSide": "",
      "strPosition": "Small Forward",
      "strCollege": null,
      "strFacebook": "",
      "strWebsite": "",
      "strTwitter": "",
      "strInstagram": "",
      "strYoutube": "",
      "strHeight": "6 ft 10 in (2.08 m)",
      "strWeight": "240 lb (109 kg)",
      "intLoved": "1",
      "strThumb": "https://www.thesportsdb.com/images/media/player/thumb/izpsjb1698837776.jpg",
      "strCutout": "https://www.thesportsdb.com/images/media/player/cutout/fiem831698837888.png",
      "strRender": "https://www.thesportsdb.com/images/media/player/render/9ftg8s1698837842.png",
      "strBanner": "https://www.thesportsdb.com/images/media/player/banner/jv7hm51598472880.jpg",
      "strFanart1": "https://www.thesportsdb.com/images/media/player/fanart/vprgih1598471168.jpg",
      "strFanart2": "https://www.thesportsdb.com/images/media/player/fanart/ezsidb1598471239.jpg",
      "strFanart3": "https://www.thesportsdb.com/images/media/player/fanart/domdl31598471317.jpg",
      "strFanart4": "https://www.thesportsdb.com/images/media/player/fanart/hb35c81598471285.jpg",
      "strCreativeCommons": "No",
      "strLocked": "unlocked",
      "name": "Kevin Durant",
      "image": "https://www.thesportsdb.com/images/media/player/cutout/fiem831698837888.png",
      "id": 140,
      "seasonAverages": {
        "pts": 27.571,
        "ast": 5.286,
        "turnover": 3.317,
        "pf": 1.778,
        "fga": 19.238,
        "fgm": 10.048,
        "fta": 6.175,
        "ftm": 5.286,
        "fg3a": 5.302,
        "fg3m": 2.19,
        "reb": 6.667,
        "oreb": 0.54,
        "dreb": 6.127,
        "stl": 0.857,
        "blk": 1.302,
        "fg_pct": 0.522,
        "fg3_pct": 0.413,
        "ft_pct": 0.856,
        "min": "37:11",
        "games_played": 63,
        "player_id": 140,
        "season": 2023
      }
    },
    {
      "idPlayer": "34161165",
      "idTeam": "134874",
      "idTeam2": "0",
      "idTeamNational": null,
      "idSoccerXML": null,
      "idAPIfootball": null,
      "idPlayerManager": null,
      "idWikidata": null,
      "strNationality": "Greece",
      "strPlayer": "Giannis Antetokounmpo",
      "strPlayerAlternate": null,
      "strTeam": "Milwaukee Bucks",
      "strTeam2": "",
      "strSport": "Basketball",
      "intSoccerXMLTeamID": null,
      "dateBorn": "1994-12-06",
      "strNumber": "34",
      "dateSigned": null,
      "strSigning": "",
      "strWage": "",
      "strOutfitter": "",
      "strKit": "Nike Kobe AD Exodus",
      "strAgent": "",
      "strBirthLocation": "Athens, Greece",
      "strEthnicity": null,
      "strStatus": "Active",
      "strDescriptionEN": "Giannis Sina Ugo Antetokounmpo (/ˈjɑːnɪs ˌɑːntɛtəˈkuːmpoʊ/ YAH-niss AHN-tet-ə-KOOM-poh; Greek: Γιάννης Σίνα-Ούγκο Αντετοκούνμπο, IPA: ; born Adetokunbo December 6, 1994) is a Greek professional basketball player for the Milwaukee Bucks of the National Basketball Association (NBA). Antetokounmpo's nationality, in addition to his size, speed and ball-handling skills have earned him the nickname \"Greek Freak\".\r\n\r\nAntetokounmpo began playing basketball for the youth teams of Filathlitikos in Athens. In 2011, he began playing for the club's senior team before entering the 2013 NBA draft, where he was selected 15th overall by the Bucks. In 2016–17 he led the Bucks in all five major statistical categories and became the first player in NBA history to finish a regular season in the top 20 in all five statistics of total points, rebounds, assists, steals, and blocks. He received the Most Improved Player award in 2017. Antetokounmpo has received five All-Star selections, including being selected as an All-Star captain in 2019 and 2020, as he led the Eastern Conference in voting in these two years.\r\n\r\nAntetokounmpo won back-to-back NBA Most Valuable Player Awards in 2019 and 2020, joining Kareem Abdul-Jabbar and LeBron James as the only players in NBA history to win two MVPs before turning 26. Along with his MVP award, he was also named the NBA Defensive Player of the Year in 2020, becoming only the third player after Michael Jordan (1988) and Hakeem Olajuwon (1994) to win both awards in the same season. In 2021, Antetokounmpo led the Bucks to their first NBA championship since 1971 and was named Finals MVP. The same year, he was selected on the NBA 75th Anniversary Team.",
      "strDescriptionDE": null,
      "strDescriptionFR": null,
      "strDescriptionCN": null,
      "strDescriptionIT": null,
      "strDescriptionJP": null,
      "strDescriptionRU": null,
      "strDescriptionES": null,
      "strDescriptionPT": null,
      "strDescriptionSE": null,
      "strDescriptionNL": null,
      "strDescriptionHU": null,
      "strDescriptionNO": null,
      "strDescriptionIL": null,
      "strDescriptionPL": null,
      "strGender": "Male",
      "strSide": "",
      "strPosition": "Power Forward",
      "strCollege": null,
      "strFacebook": "",
      "strWebsite": "",
      "strTwitter": "",
      "strInstagram": "",
      "strYoutube": "",
      "strHeight": "6 ft 11 in (2.11 m)",
      "strWeight": "242 lb (110 kg)",
      "intLoved": "0",
      "strThumb": "https://www.thesportsdb.com/images/media/player/thumb/t1yafh1550408393.jpg",
      "strCutout": "https://www.thesportsdb.com/images/media/player/cutout/mschrn1702559698.png",
      "strRender": "https://www.thesportsdb.com/images/media/player/render/h52fa01702559643.png",
      "strBanner": null,
      "strFanart1": null,
      "strFanart2": null,
      "strFanart3": null,
      "strFanart4": null,
      "strCreativeCommons": "No",
      "strLocked": "unlocked",
      "name": "Giannis Antetokounmpo",
      "image": "https://www.thesportsdb.com/images/media/player/cutout/mschrn1702559698.png",
      "id": 15,
      "seasonAverages": {
        "pts": 30.662,
        "ast": 6.4,
        "turnover": 3.385,
        "pf": 2.892,
        "fga": 18.585,
        "fgm": 11.4,
        "fta": 11.046,
        "ftm": 7.338,
        "fg3a": 1.769,
        "fg3m": 0.523,
        "reb": 11.138,
        "oreb": 2.508,
        "dreb": 8.631,
        "stl": 1.185,
        "blk": 1,
        "fg_pct": 0.613,
        "fg3_pct": 0.296,
        "ft_pct": 0.664,
        "min": "35:01",
        "games_played": 65,
        "player_id": 15,
        "season": 2023
      }
    }
  ]

  // useEffect(() => {
  //   const fetchPlayerData = async () => {
  //     const theSportsDBApiKey = "3";
  //     const ballDontLieApiKey = "07bcd3e7-2f7c-4f6c-904b-4b835d67ccba";
  //     const season = 2023;
  //     const playerNames = ["Stephen Curry", "LeBron James", "Kevin Durant", "Giannis Antetokounmpo"];
  //     const topPlayerNames = [
  //       "LeBron James",
  //       "Kevin Durant",
  //       "Giannis Antetokounmpo",
  //       "Stephen Curry",
  //       "Nikola Jokic",
  //       "Joel Embiid",
  //       "Luka Doncic",
  //       "Kawhi Leonard",
  //       "Anthony Davis",
  //       "James Harden",
  //       "Damian Lillard",
  //       "Jayson Tatum",
  //       "Jimmy Butler",
  //       "Devin Booker",
  //       "Chris Paul",
  //       "Kyrie Irving",
  //       "Russell Westbrook",
  //       "Paul George",
  //       "Karl-Anthony Towns",
  //       "Bradley Beal",
  //       "Donovan Mitchell",
  //       "Zion Williamson",
  //       "Trae Young",
  //       "Ja Morant",
  //       "Bam Adebayo"
  //     ]

  //     // First, fetch detailed player information including images from TheSportsDB
  //     const playersWithImages = await Promise.all(playerNames.map(async (name) => {
  //       const response = await fetch(`https://www.thesportsdb.com/api/v1/json/${theSportsDBApiKey}/searchplayers.php?p=${encodeURIComponent(name)}`);
  //       const data = await response.json();
  //       if (data.player && data.player.length > 0) {
  //         return {
  //           ...data.player[0],
  //           name: data.player[0].strPlayer,
  //           image: data.player[0].strCutout, // Assuming strCutout is the desired image property
  //         };
  //       }
  //       return null;
  //     }));

  //     // Filter out null values (if any player wasn't found)
  //     const validPlayersWithImages = playersWithImages.filter(Boolean);

  //     // Fetch player IDs and season averages from BallDontLlie API
  //     const playerStats = await Promise.all(validPlayersWithImages.map(async (player) => {
  //       // Fetch player ID
  //       const playerResponse = await fetch(`https://api.balldontlie.io/v1/players?search=${player.strPlayer.split(" ")[1]}`, {
  //         headers: { 'Authorization': ballDontLieApiKey }
  //       });
  //       const playerData = await playerResponse.json();
  //       const playerDetails = playerData.data.find(p => `${p.first_name} ${p.last_name}` === player.strPlayer);

  //       console.log(playerDetails, "PLAYER IDS!!")

  //       if (playerDetails) {
  //         // Fetch season averages using player ID
  //         const averagesResponse = await fetch(`https://api.balldontlie.io/v1/season_averages?season=${season}&player_ids[]=${playerDetails.id}`, {
  //           headers: { 'Authorization': ballDontLieApiKey }
  //         });
  //         const averagesData = await averagesResponse.json();
  //         return {
  //           ...player,
  //           id: playerDetails.id,
  //           seasonAverages: averagesData.data[0] // Assumes there's only one set of averages per player
  //         };
  //       }
  //       return player; // Return player details without stats if not found
  //     }));
  //     console.log(playerStats, "PLAYER STATS")
  //     setPlayersData(playerStats);
  //   };

  //   fetchPlayerData();
  // }, []);

  // console.log(playersData)


  // useMemo to only update on changes
  const filteredData = useMemo(() => [selectedPlayer1, selectedPlayer2].filter(Boolean), [selectedPlayer1, selectedPlayer2]);

  return (
    <div className="App">
      <h1>Compare NBA Player Stats</h1>
      <div className="selectors">
        <PlayerSelector players={staticPlayersData} onChange={(selected) => setSelectedPlayer1(selected)} label="Select Player 1" />
        <PlayerSelector players={staticPlayersData} onChange={(selected) => setSelectedPlayer2(selected)} label="Select Player 2" />
      </div>
      <div className="comparison-container">
        {[selectedPlayer1, selectedPlayer2].filter(Boolean).map((player, index) => (
          <div key={index}>
            <h2>{player.name}</h2>
            <p>Team: {player.strTeam}</p>
            <p>Position: {player.strPosition}</p>
            {player.strCutout && <img src={player.strCutout} alt={`Image of ${player.name}`} style={{ maxWidth: '100px' }} />}
            {/* Render additional player details as desired */}
          </div>
        ))}
      </div>
      <BarChart data={filteredData} />
      <RadarChart data={filteredData} />
    </div>
  );
}

export default App;
