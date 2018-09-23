// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import React, { Component } from "react";
import { connect } from "react-redux";

import { NavBar } from "../../Components";
import cx from "classnames";

const defaultProps = {};
const propTypes = {};

const mapStateToProps = state => {
  return {};
};

class GuidePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      data: [],
      selectedKey: "contact",
      tabs: [
        { key: "menu", name: "Menu Guide" },
        { key: "travel", name: "Travel Guide" },
        { key: "korea", name: "About Korea" },
        { key: "contact", name: "Business Inquires (Contact Us)" }
      ]
    };
  }

  componentWillMount() {}

  componentDidMount() {}

  componentDidUpdate() {}

  render() {
    const { tabs, selectedKey } = this.state;
    return (
      <div className="guidePage">
        <NavBar isActive="guide" />
        This is Guide Redux Page
        <div className="guidePage__notice">
          <div className="guidePage__notice__content">
            <div className="guidePage__notice__content__wrapper">
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                  justifyContent: "center",
                  textAlign: "left"
                }}
              >
                <p>Welcome!</p>
                <p>
                  Learn how to use <b>Hooah!U</b> smarter!
                </p>
              </div>
              <img src="" alt="" />
              <hr />
              {tabs.map(data => {
                return (
                  <div
                    key={data.key}
                    className={cx(
                      "guidePage__notice__content__wrapper__itemContainer",
                      {
                        "guidePage__notice__content__wrapper__itemContainer-active":
                          selectedKey === data.key
                      }
                    )}
                    onClick={() => this.handleClick(data.key)}
                  >
                    <div className="guidePage__notice__content__wrapper__itemContainer__item">
                      <p>{data.name}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="guidePage__feed">
          <div className="guidePage__feed__content">
            <div className="guidePage__feed__content__header">
              {this.renderHead()}
            </div>
            <hr />
            <div className="guidePage__feed__content__body">
              {this.renderBody()}
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleInput = e => {
    this.setState({ input: e.target.value });
  };

  handleClick = param => {
    this.setState({ selectedKey: param });
  };

  renderHead = () => {
    switch (this.state.selectedKey) {
      case "menu":
        return <h4>General Guide About Hooah!U's Service</h4>;
      case "travel":
        return <h4>travel</h4>;
      case "korea":
        return <h4>Basics of Korea</h4>;
      case "contact":
        return (
          <h4>Your Business / Place Can be Promoted to All USFK Personnel</h4>
        );
      default:
        return null;
    }
  };

  renderBody = () => {
    switch (this.state.selectedKey) {
      case "menu":
        return (
          <div className="guidePage__feed__content__body-menu">
            <h5>Feed</h5>
            <h6>
              Feed에서 USFK 네트워크 사람들을 만나고 필요한 정보를 찾아보세요
            </h6>
            <p>
              Feed에서 USFK 네트워크의 사람들과 소통하고 필요한 정보를 찾을 수
              있습니다. 원하는 Post type에 맞게 선택해서 글을 확인할 수
              있습니다.
            </p>

            <h5>Package Trip</h5>
            <h6>PASS를 효과적으로 활용해보세요</h6>
            <p>
              패키지리스트는 제한된 시간과 거리 내에서 한국을 효율적으로
              여행하기 위해 후아유팀에서 만든 여행 패키지 메뉴입니다. 모든
              패키지들은 후아유 팀 멤버들이 직접 엄선하여 만들었습니다. <br />
              본인의 1)
              <span> 패스 Day수</span> 2)
              <span> 원하는 테마</span> 등에 따라 여행지를 sort하고 이용하면
              됩니다. 개별 장소는 추후 Place List에 업데이트 될 예정입니다.
            </p>

            <h5>Place List</h5>
            <h6>원하는 개별 장소를 찾아보세요</h6>
            <p>
              Place List에서는 당신이 원하는 개별 장소를 찾아볼 수 있습니다.
              후아유팀이 엄선해 둔 특정 지역의 특정 장소를 찾아보세요.
            </p>
          </div>
        );
      case "travel":
        return <div className="guidePage__feed__content__body-travel" />;
      case "korea":
        return (
          <div className="guidePage__feed__content__body-korea">
            <h5>About Korea (Visit Korea)</h5>
            <p>
              <a href="https://english.visitkorea.or.kr/enu/AKR/AKR_MAIN.jsp">
                https://english.visitkorea.or.kr/enu/AKR/AKR_MAIN.jsp
              </a>
            </p>

            <h5>Where is Korea?</h5>
            <p>
              The Korean peninsula is located in North-East Asia. It is
              surrounded by the ocean on three sides, making it a unique
              geographical location. With Seoul as its capital city, the
              landsite is roughly 1,030 km (612 miles) long and 175 km (105
              miles) wide at its narrowest point. Korea's total land area is
              100,033 square km, neighboring Japan to the east, China to the
              west, and sharing a northern border with Democratic People's
              Republic of Korea (North Korea). <br />
              <br />
              According to the Ministry of Government Administration and Home
              Affairs, as of July 2015, the total population of Korea is
              51,448,183, ranking 26th globally by country. Out of the total
              population, roughly 20% live in Seoul, the capital city of Korea.
              Other large and economically advanced cities such as Busan,
              Incheon, Daegu, Daejeon, Gwangju and Ulsan have higher population
              densities than other cities in Korea.
            </p>

            <h5>National Flag</h5>
            <p>
              <b>Taegeukgi</b> : Its design symbolizes the principles of the yin
              and yang in oriental philosophy. The circle in the center is
              divided into two equal parts, where the upper red responds to the
              active cosmic forces of the yang; conversely, the lower blue
              section represents the passive cosmic forces of the yin. The
              flag's background is white, representing Korean’s desire for peace
              and purity. The circle is surrounded by four trigrams, one in each
              corner, characterizing continual movement, balance and harmony.
              Each trigram symbolizes one of the four universal elements
              (heaven, earth, fire, and water).
            </p>

            <h5>National Flower</h5>
            <p>
              <b>Mugunghwa</b> : The national flower of Korea is mugunghwa, or
              rose of Sharon, which comes into bloom from July to October every
              year. Profusions of the blossom gracefully decorate the entire
              nation during that time, providing a view which has been loved by
              all Korean for many years. It is also favorite plant of the people
              as the flower’s symbolic significance stems from the Korean word
              ‘mugung’, meaning immortality. This word accurately reflects the
              enduring nature of Korean culture, and the determination and
              perseverance of the Korean people.
            </p>

            <h5>National Anthem</h5>
            <p>
              <b>Aegukga</b> : Aegukga literally means 'a song expressing one’s
              love towards their country' in Korean, and that was the exact
              reason this anthem came to be born. Since its creation, the song
              has undergone several versions of transition; however, it remained
              focused on praising the sense of loyalty to the country. Maestro
              Ahn Eak-tai (1905-1965) is credited with having made the present
              form of the song in 1935, which was then adopted by the Korean
              Government (1948) officially as the national anthem and began to
              be used at all schools and official functions.
            </p>

            <p className="guidePage__feed__content__body-korea__fig56">
              <img
                src="https://hooahu.agit.io/secure_link?sub=group&key=300113685&h=wn%2FWCM%2Bs3ZN3LealenheCOETQ88%3D&act=download&ref=302357421&url=https%3A%2F%2Fmud-kage.kakao.com%2Fdna%2FckBpZV%2FbtqoI4Zy8Xq%2Fjvkfa52qgcjxkpvik9aaxz%2Fo.png"
                alt="GuidePage_fig"
              />
              <img
                src="https://hooahu.agit.io/secure_link?sub=group&key=300113685&h=4BNYlSUUbhdShoY8QhyYpSDODQE%3D&act=download&ref=302357417&url=https%3A%2F%2Fmud-kage.kakao.com%2Fdna%2Fb4bK4Z%2FbtqoI5D8g3K%2F5iv2zg2loqeg9eatpuycxz%2Fo.jpg"
                alt="GuidePage_fig"
              />
            </p>

            <h5>Weather</h5>
            <p className="guidePage__feed__content__body-korea__fig7">
              <img
                src="https://hooahu.agit.io/secure_link?sub=group&key=300113685&h=m2Wagm7IVa9HEoGIoVfjqgmSrpE%3D&act=download&ref=302357420&url=https%3A%2F%2Fmud-kage.kakao.com%2Fdna%2FyAVsm%2FbtqoECJUXHG%2Fbuoj2e9numd7nmr66inuxz%2Fo.png"
                alt="GuidePage_fig"
              />
            </p>
          </div>
        );
      case "contact":
        return (
          <div className="guidePage__feed__content__body-contact">
            <q> 당신의 비즈니스를 미군들에게 알려보세요! </q>

            <h5>Contact Point</h5>
            <p>
              <a href="">team@hooahu.com</a>
            </p>
          </div>
        );
      default:
        return null;
    }
  };
}

GuidePage.defaultProps = defaultProps;
GuidePage.propTypes = propTypes;

export default connect(mapStateToProps)(GuidePage);
