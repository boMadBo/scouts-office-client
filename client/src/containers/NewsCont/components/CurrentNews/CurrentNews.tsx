import Loading from '@/uikit/Loading';
import React from 'react';
import styles from './CurrentNews.module.scss';

interface Props {
  id: string | undefined;
}

const key = process.env.REACT_APP_TRANSFERMARKT ?? 'DEFAULT_KEY';

const mockNews = {
  id: '372889',
  headline: 'Saint-Maximin verlängert vorzeitig bei Newcastle United – „Er kann es sehr weit schaffen“',
  timestamp: 1602695557,
  formdDate: 'Sep 1, 2023 18:40',
  firstImage: 'https://img.a.transfermarkt.technology/portrait/medium/272642-1557495119.png?lm=1',
  secondImage: 'https://tmssl.akamaized.net/images/wappen/medium/762.png?lm=1472921161',
  heroImage:
    'https://tmssl.akamaized.net/images/foto/galerie/allan-saint-maximin-newcastle-1589879184-39064.jpg?lm=1589879201',
  // text: {
  //   text0:
  //     '<a href="/DE_DE/player/272642">Allan Saint-Maximin</a> hat seinen bis 2025 laufenden Vertrag bei <a href="/DE_DE/club/762">Newcastle United</a> fr&uuml;hzeitig verl&auml;ngert. Wie die &bdquo;Magpies&ldquo; am Mittwoch bekannt gaben, l&auml;uft das neue Arbeitspapier des ehemaligen <a href="/DE_DE/club/42">Hannover</a>&ndash;Profis bis zum 30.06.2026.',
  //   text1: '<widget data-category="playerMarketValueBox" data-id="playerMarketValueBox_1187716773"/>',
  //   text2:
  //     '&bdquo;Ich habe f&uuml;r eine Menge Klubs gespielt &ndash; Monaco, Nizza, in Deutschland &ndash; aber in Newcastle f&uuml;hle ich mich wirklich zuhause. Die Fans zeigen mir sehr viel Liebe, genau wie der Trainer und meine Mitspieler auf dem Feld. Das war zwar auch bei jedem anderen Verein der Fall, aber hier ist es etwas ganz besonderes. Wenn ich den Fans also mit dieser Vertragsverl&auml;ngerung etwas zur&uuml;ckgeben kann, bin ich sehr zufrieden&ldquo;, sagte der Linksau&szlig;en, der <a href="/DE_DE/articleDetails/372741" target="_blank">beim j&uuml;ngsten Marktwert-Update der Premier League</a> zu den gr&ouml;&szlig;ten Gewinnern z&auml;hlte.',
  //   text3: '<widget data-category="gallery" data-id="gallery_86932159"/>',
  //   text4:
  //     'Newcastles Trainer <a title="Steve Bruce" href="/api/profile/AppStaff/447">Steve Bruce</a> f&uuml;gte an: &bdquo;Wir sind sehr gl&uuml;cklich, dass er sich f&uuml;r so lange Zeit an den Klub gebunden hat. Wir sind &uuml;bergl&uuml;cklich, er ist &uuml;bergl&uuml;cklich, und ich denke auch die Fans werden froh &uuml;ber diese Nachricht sein. Allan wei&szlig; nun, worauf es in der Premier League ankommt, und hat die Welt zu seinen F&uuml;&szlig;en liegen. Er kann es sehr weit schaffen, weil er das absolute Talent dazu hat.&ldquo;',
  //   text5: '<widget data-category="socialBox" data-id="socialBox_713798386"/>',
  // },
  text: '      It is a failure of epic proportions.  Bayern Munich  saw not one but three transfers collapse on transfer deadline day. On the lookout for a defender, Bayern saw talks with Southampton for  Armel Bella-Kotchap  and Chelsea for  Trevoh Chalobah  collapse on Friday. Bayern wanted to sign at least one of those two center-backs to replace Benjamin Pavard. Not getting those deals across the line will hurt. But even worse is the collapsed deal for  Fulham  midfielder  Jo o Palhinha . A potential  65m transfer for the 28-year-old defensive midfielder was not only agreed but Palhinha was in Munich with a Bayern jersey in hand ready to be presented. But pen was never put to paper on the contract that was supposed to run to 2028 as Fulham could not secure a replacement.    Palhinha joined Fulham in 2022 for  20m from Portuguese side  Sporting  and is under contract until 2027. Since joining the London-based club, Palhinha has increased his market value from  25m to  40m and is the most valuable player in Fulham s squad. Bayern saw that market value as a much more realistic evaluation, and ultimately their  65m offer including bonuses was accepted. That fee would have made Palhinha  the fourth most expensive signing in Bayern s history  and  the most expensive departure in Fulham s history  ahead of  Aleksandar Mitrovic . Mitrovic was sold for  52.6m to  Saudi Pro League  side  Al-Hilal  this summer.    The failed transfer will come as a massive shock to Bayern boss Thomas Tuchel, who made signing a new no.6 a priority this transfer window. "Ive been asked about this five times now,  Tuchel said after Bayern s 3-1 win over Augsburg last weekend when asked about wanting another no.6.  I said we only have three central midfielders who can play the holding midfield role, the moment someone gets injured, well only have two. And we play with a double pivot. So, its all a matter of numbers.  Palhinha is just the latest failed transfer for Bayern. The club previously failed to secure Declan Rice from West Ham. Rice joined Arsenal instead.    More than another no.6   Why Bayern want Palhinha?  At the moment, Bayern have  Joshua Kimmich ,  Leon Goretzka,  and  Konrad Laimer  available in central midfield.  Ryan Gravenberch  can also play there  but is currently in talks with Liverpool over a potential transfer . Then there is nominal left-back  Rapha l Guerreiro , who last season also featured as a box-to-box midfielder for Dortmund. In other words, Tuchel, at a pinch, has three true midfielders plus Guerreiro available. But neither Kimmich, Goretzka nor Laimer are traditional defensive midfielders in a true no.6 mold.   \n The same cannot be said about Palhinha. According to  Squawka , Palhinha led all top seven league players with 154 tackles since the start of the 2022/23 season. According to Wyscout, Palhinha led the Premier League last season with 337 defensive duels. Indeed, Palhinha has been favorably compared to former Bayern great  Javi Mart nez . Mart nez, of course, was central to Bayern Munich s treble success in the 2012/13 season and was also still in the squad for the 2019/20 treble season. Tuchel believed that Palhinha could have played a similar role for Bayern in the upcoming years but with the deal off Tuchel will now have to continue to improvise as the club will certainly try again to sign Palhinha in January. ',
};

const CurrentNews = ({ id }: Props) => {
  // const data = useGetCurrentNews(id, key);

  if (!mockNews.firstImage) {
    return <Loading />;
  }
  return (
    <section className={styles.currNews}>
      <div className={styles.newsHeader}>
        <img src={mockNews.firstImage} alt="" />
        <div className={styles.rightWrap}>
          <div className={styles.topWrap}>
            {mockNews.secondImage && <img src={mockNews.secondImage} alt="" className={styles.logoImg} />}
            <span className={styles.date}>{mockNews.formdDate}</span>
          </div>
          <h1 className={styles.title}>{mockNews.headline}</h1>
        </div>
      </div>
      <div>
        <img src={mockNews.heroImage} alt="" className={styles.heroImg} />
        <p className={styles.text}>{mockNews.text}</p>
      </div>
    </section>
  );
};

export default React.memo(CurrentNews);
