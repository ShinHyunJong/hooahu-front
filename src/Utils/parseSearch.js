export function parseSearch(search) {
  // search는 물음표(?)를 반드시 포함해야 한다. ex. location.search 참조
  // search -> "?courseId=3&now=2"
  let query = {};
  // first, second, third는 임의의 변수명, 의미없음
  const first = search.split("?"); // first -> ["", "courseId=3&now=2"]
  // query가 존재하지 않을 경우
  if (first.length > 1) {
    const second = first[1].split("&"); // second -> ["courseId=3", "now=2"]
    const third = second.map(
      // third -> [{course: 3}, {now: 3}]
      element => ({ [element.split("=")[0]]: element.split("=")[1] })
    );
    for (let i = 0; i < third.length; i += 1) {
      query = { ...query, ...third[i] };
    }
  }
  return {
    ...query
  };
}
