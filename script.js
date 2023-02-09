// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.


//중간에 큰 화살표 클릭시 없어지고 답변보기박스가 나오는 동작
const arrow__right = document.querySelector("#arrow-right");
const discussion__wrapper__right = document.querySelector(".discussion__wrapper")
function arrowRightClick(){
  arrow__right.classList.add("arrowRight");
  discussion__wrapper__right.classList.add("discussion__wrapper__right");
}
arrow__right.addEventListener("click", arrowRightClick);


//html에 부여되있는 첫번째 li지움
const liFirst = document.querySelector("#li-first");
const container = document.querySelector(".discussion__container");
const li = document.querySelector("li");
li.classList.add = "show";
liFirst.remove();


//다크모드 토글을 위한 DOM
const arrowbox = document.querySelector('#arrow-right');
const toggleBtn = document.querySelector('.toggle');
const mainbox = document.querySelector('main');
const bodybox = document.querySelector('body');
const maintitlebox = document.querySelector('.main-title');
const container__box = document.querySelector('.container__box');
const questionbox = document.querySelector('.question');
const answerbox = document.querySelector('#question');
const discussion__wrapperbox = document.querySelector('.discussion__wrapper');
//const pagibox = document.querySelectorAll('.pagi');
//const page__numberbox = document.querySelectorAll('.page-number');
const nameInput = document.querySelectorAll('#name');
const textInput = document.querySelector('#story');

//다크모드 토글
var toggle = (function () {
  var isShow = false;
  return function () {
    arrowbox.style.color = isShow ? '#0071e3' : '#f5f5f7';
    mainbox.style.backgroundColor = isShow ? '#f5f5f7' : 'rgba(0,0,0,0)';
    bodybox.style.backgroundColor = isShow ? '#f5f5f7' : 'rgba(0,0,0,0.88)';
    maintitlebox.style.backgroundColor = isShow ? '#313132' : '#0071e3';
    container__box.style.backgroundColor = isShow ? '#f2f2f3' : 'rgba(0,0,0,0)';
    questionbox.style.color = isShow ? '#313132' : '#f5f5f7';
    discussion__wrapperbox.style.backgroundColor = isShow ? '#f2f2f3' : 'rgba(0,0,0,0)';
    answerbox.style.color = isShow ? '#313132' : '#f5f5f7';
    //pagibox[0].style.color = isShow ? '#313132' : 'white';
    //pagibox[1].style.color = isShow ? '#313132' : 'white';
    //page__numberbox[0].style.color = isShow ? '#313132' : 'white';
    //page__numberbox[1].style.color = isShow ? '#313132' : 'white';
    //page__numberbox[2].style.color = isShow ? '#313132' : 'white';
    //page__numberbox[3].style.color = isShow ? '#313132' : 'white';
    //page__numberbox[4].style.color = isShow ? '#313132' : 'white';
    nameInput[0].style.color = isShow ? 'black' : 'white';
    nameInput[1].style.color = isShow ? 'black' : 'white';
    textInput.style.color = isShow ? 'black' : 'white';
    textInput.style.borderColor = isShow ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.5)';
    //discussionTitle.style.color = isShow ? 'black' : 'white';
    isShow? textInput.classList.remove('storyPlaceholderClass'):textInput.classList.add('storyPlaceholderClass');
    //isShow? q[0].classList.remove('discussion__contentColorChange'):q[0].classList.add('discussion__contentColorChange');
    textInput.style.color = isShow ? 'black' : 'white';
    isShow = !isShow;
  };
})();
  toggleBtn.onclick = toggle;





// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정


  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  //아바타
  const avatarImg = document.createElement('img');
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  //제목
  const title = document.createElement('h2');
  title.className = "discussion__title";
  const a = document.createElement('a');
  a.href = obj.url;
  a.textContent = obj.title;
  title.prepend(a);
  discussionContent.append(title);

//글쓴이와 시간
  const authorTime = document.createElement('div');
  authorTime.className = "discussion__information";
  let time = new Date(obj.createdAt).toLocaleDateString();
  authorTime.textContent = obj.author + " / " + time;
  discussionContent.append(authorTime);

  //체크표시
  const check = document.createElement('p');
  check.textContent = obj.answer ? '✔️' : '❌';
  //const icon = document.createElement('i');
  //icon.className = "fas fa-caret-down";
  discussionAnswered.append(check);
  //check.append(icon);
  
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  li.classList.add("show");
  return li;
};


// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.

let render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
    
    const searchFilter = agoraStatesDiscussions[i].title;
    const searchInput = document.querySelector(".search_input"); //search입력element

    const searchFilterFunc=(e) => {
        if(searchFilter.includes(e.target.value)){ //"koans과제 진행 중 npm install"을 차례로 돈다.
          element.prepend(convertToDiscussion(agoraStatesDiscussions[i]));
        }
        //convertToDiscussion(agoraStatesDiscussions[i]).style.display = "none";
    }
    searchInput.addEventListener("change", searchFilterFunc);
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);





//질문하기박스에서 정보를 입력하고 submit을 누르면 답변보기에서 업데이트되는 동작을 위한 변수
const formName = document.querySelector(".form-name");
const formTitle = document.querySelector(".form-title");
const formText = document.querySelector(".form-text");
const formSubmit = document.querySelector(".input__submit");

formSubmit.addEventListener("click", submitClick);


//질문하기박스에서 정보를 입력하고 submit을 누르면 답변보기에서 업데이트되는 동작을 위한 함수
let arr = {};
//submit누르면 data.js 로 보내고 1페이지 자동 클릭되게 하기
function submitClick(event){
  event.preventDefault();

  if(arr!=={}){
  arr.avatarUrl = "https://play-lh.googleusercontent.com/38AGKCqmbjZ9OuWx4YjssAz3Y0DTWbiM5HB0ove1pNBq_o9mtWfGszjZNxZdwt_vgHo=s200";
  arr.author = formName.value;
  arr.title = formTitle.value;
  arr.bodyHTML = formText.value;

  let today = new Date();
  arr.createdAt = today;
  console.log(arr);



  let inputAgoraData = arr;
  let inputAgoraDatas = [];
  // localStorage
  if (window.localStorage.length > 0) {
    const getInputAgoraDatas = window.localStorage.getItem('inputAgoraDatas');
    const inputAgoraDatasArr = JSON.parse(getInputAgoraDatas);
    for(let i = 0; i < inputAgoraDatasArr.length; i++) {
      inputAgoraDatas.push(inputAgoraDatasArr[i]);
    }
    inputAgoraDatas.push(inputAgoraData);
    const inputAgoraDataString = JSON.stringify(inputAgoraDatas);
    window.localStorage.setItem('inputAgoraDatas',inputAgoraDataString);
  } else {
    inputAgoraDatas.push(inputAgoraData);
    const inputAgoraDataString = JSON.stringify(inputAgoraDatas);
    window.localStorage.setItem('inputAgoraDatas',inputAgoraDataString);
  }

  agoraStatesDiscussions.unshift(inputAgoraData);
  console.log(agoraStatesDiscussions);
  const render = (element) => {
    for (let i = 0; i < 1; i += 1) {
      element.prepend(convertToDiscussion(agoraStatesDiscussions[i]));
    }
    return;
  };
  
  render(ul);
  arr = {};
  }
}

//LocalStorage 렌더링
const renderLocalStorage = (element) => {
  const agoraDatas = window.localStorage.getItem('inputAgoraDatas');
  const agoraDataObj = JSON.parse(agoraDatas);

  if (agoraDataObj) {
    for (let i = 0; i < agoraDataObj.length; i++) {
      element.prepend(convertToDiscussion(agoraDataObj[i]));
      //console.log(agoraDataObj);
    }
  }
  return;
}
renderLocalStorage(ul);
