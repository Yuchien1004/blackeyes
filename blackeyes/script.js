//延遲器(雖然感覺沒有效果)
function delay(n){
  return new Promise(function(resolve){
      window.setTimeout(function(){
        resolve();
      },n*1000);
  });
}
function Shine(){
  return new Promise(function(resolve){
    img.style.display = 'flex';
    img.style.transition = "background-color 0.5s ease 0s";
    img.style.backgroundColor = 'rgb(0, 0, 0, 1)';
    setTimeout(function(){
      img.style.backgroundColor = 'rgb(0, 0, 0, 0)';
      setTimeout(function(){
        resolve()
        img.style.display = "none";
      }, 500);
    },20);
  });
}
function dark(end){
  return new Promise(function(resolve){
    img.style.display = "flex";
    img.classList.add("imganimate");
    img.style.backgroundColor = 'rgb(0, 0, 0, 1)';
    start.style.display = "block";
    start.style.top = "50%";
    start.style.color = "#fff";
    start.innerHTML = end;
    setTimeout(function(){
      img.style.backgroundColor = 'rgb(0, 0, 0, 0)';
      setTimeout(function(){
        resolve()
        img.classList.remove("imganimate");
        img.style.display = "none";
        start.style.display = "none";
      }, 500);
    },4500);
  });
}
//調整音樂(功能可能會被刪除)
let voice = 0
const mode = ["靜音.png","較低.png","最大.png"]
var eaudio = document.getElementById("eaudio");
function volume(){
  eaudio.play();
  var music = document.getElementById("music");
  voice++
  if(voice == 0){
    eaudio.muted = true;
  }
  if(voice == 1){
    eaudio.muted = false;
    eaudio.volume = 0.4;
  }
  if (voice == 2){
    eaudio.volume = 0.9;
  }
  if(voice > 2){
    voice = 0;
    eaudio.muted = true;
  }
  music.style.backgroundImage = "url('" + mode[voice] + "')"
}
//下雨啦
const audioimg = document.getElementsByClassName("audioimg")
const box = document.getElementById("rainBox");
let boxHeight = box.clientHeight;
let boxWidth = box.clientWidth;
window.onresize = function() {
  boxHeight = box.clientHeight;
  boxWidth = box.clientWidth;
}
y = 0;
k = 0;
backgroundNumber = 0;
function rainDot() {
  let rain = document.createElement('div');
  rain.classList.add('rain');
  rain.style.top = 0;
  rain.style.left = `${Math.random() * boxWidth}px`;
  rain.style.opacity = Math.random();
  box.appendChild(rain);
  let gap = 1;
  const loop = setInterval(() => {
    if (parseInt(rain.style.top) > boxHeight) {
      clearInterval(loop);
      box.removeChild(rain);
    }
    gap++
    rain.style.top = `${parseInt(rain.style.top)+gap}px`;
  }, 20)
}
function repeatrain(){
  if(k <= 40){
    y = Math.round(51 - 1.25 * k);
  }
  else if(k > 40 && k <= 100){
    y = Math.round(0.5 * k);
  }
  else{
    y = 100;
  }
  setTimeout(function(){
    rainDot();
    repeatrain();
  },y);
}
repeatrain()
//開場動畫
const start = document.getElementById("start");
const img = document.getElementById("backgroundImg");
const dialogue = document.getElementsByClassName("dialogue");
const nextButton = document.getElementById("nextbutton");
const rn = document.getElementsByClassName("rn");
const ruleName = document.getElementById("ruleName");
const choseone = document.getElementById("choseone");
const chosetwo = document.getElementById("chosetwo");
const ruleone = document.getElementById("ruleone");
const ruletwo = document.getElementById("ruletwo");
const rulethree = document.getElementById("rulethree");
const goBack = document.getElementById("goback");
const about = document.getElementById("about");
start.classList.add("animate");
var go = function(){
  start.classList.remove("animate");
  start.classList.add('anima')
  img.style.backgroundColor = 'rgb(0, 0, 0, 1)';
  about.style.display = "none";
  setTimeout(function() {
    dialogue[0].style.display = "block"
    choseone.style.display = "none";
    chosetwo.style.display = "none";
    nextButton.style.display = "none";
    document.body.style.backgroundImage = "url('busshelter.jpg')"
    img.style.backgroundColor = 'rgb(0, 0, 0, 0)';
    start.style.display = "none";
    img.removeEventListener("click",go,false);
    setTimeout(function(){
      img.style.display = "none";
      start.classList.remove("anima");
      Game();
    }, 1000);
  }, 2000);
}
about.addEventListener("click",function(e){
  e.stopPropagation();
},false);
img.addEventListener('click', go ,false);
//印文字
let circle = 0;
let waitingsecond = 0;
const dialog = document.getElementById("dialog");
function TypeText(text){
  return new Promise(function(resolve,reject){
    nextButton.style.display = "none";
    waitingsecond = text.length;
    const intervalId = setInterval(() => {
      dialog.textContent = text.substring(0,circle + 1);
      circle++;
      var listener = function(){
        dialogue[0].removeEventListener("click",listener,false);
        clearInterval(intervalId);
        dialog.textContent = text;
        waitingsecond = 0;
        circle = 0
        resolve()
      }
      dialogue[0].addEventListener('click',listener,false);
      if(circle > text.length){
        clearInterval(intervalId);
        dialogue[0].removeEventListener("click",listener,false);
        circle = 0
        waitingsecond = 0;
        resolve()
      }
    },100);
  });
}
//大量的設定
const allRule = ["李龍第","晴子","女子","老闆"];
const allruleImg = ["man.png","summer.png","woman.png","angrysummer.png",
"man_dark.png","summer_dark.png","woman_dark.png","angrysummer_dark.png"]
const dialogueText = ["李龍第手上掛著一件女用的綠色雨衣，撐著黑色雨傘，站在街道上的公路汽車亭。",
"公車停了下來。","李龍第上了車，聽著人們在汽車廂裡嘆喟著這場不停的雨。",
"雨水劈啪地敲打玻璃窗，像打著他那張貼著玻璃窗沉思的臉孔。",
"李龍第想著晴子黑色的眼睛，便由內心裡的一種感激勾起一陣絞心的哀愁。",
"李龍第彷彿看見晴子站在特產店櫥窗後面，想著她急切地等待老闆接她的班。",
"想著她獨自肩負兩人生活的重擔。","悶悶地就這麼想著這一切。",
"公車抵達了戲院。","李龍第站在戲院廊下的人叢前，守望著晴子約定前來的方向。",
"……！"/*李龍第*/,"李龍第突然打開雨傘衝到對面商店的走廊，走入麵包店，在眾多品項裡挑選了兩個葡萄乾麵包。",
"他將裝著麵包的紙袋塞入雨衣的口袋裡，用傘抵著那萬斤的雨水衝回戲院廊下。",
"戲院打開鐵柵門的聲音使李龍第轉過頭去。","他看著人潮湧入戲院之中，而他等候的人始終沒有到來。",
"最後，只剩下兜售橘子的婦人與賣香花的小女孩。",
"女孩央求著李龍第，他思忖一番，想到晴子就快出現，仍是買下了一朵香花。",
"他把小花輕輕塞進上衣胸前的小口袋。","鐵柵門關閉的吱喳聲傳來，他右掌緊握傘柄，羞熱地站在街道中央。",
"李龍第垂下頭，沉痛地走開了，坐上了市區的公共汽車。",
"李龍第下車後，街道的積水淹沒了他的皮鞋。",
"他迅速地朝著晴子工作的特產店走去，映入眼簾的卻是各處半掩的鐵門，和在小門前拖地的特產店老闆。",
"李龍第會選擇回家還是上前詢問？"/*選擇*/,"李龍第走上前，和特產店的老闆搭話。",
"請問老闆，晴子小姐是不是還在這裡？"/*李龍第*/,"她半小時前就走了，不知道又在鬧什麼脾氣。"/*老闆*/,
"發生了什麼事嗎？"/*李龍第*/,"我不過回家吃飯，慢了點回來。——話說回來，你是她的什麼人？"/*老闆*/,
"我是她的丈夫。不好意思打擾你了。"/*李龍第*/,"李龍第離開特產店之後要前往哪裡？"/*選擇*/,
"回到街道，行走間積水已逐漸淹到了他的膝蓋。",
"面對這樣的雨，李龍第驀地覺得自己在這座城市失了目標，手裡的傘再也撐不住這一切。",
"他望著逃竄的人們，面臨這共同災禍的恐懼，若還能看見晴子，與愛人相擁而亡……",
"他從未像此刻一樣憎惡人類是如此眾多。",
"（自私、粗野，排擠和踐踏著別人。如此模樣求生的世人多麼可恥啊。）"/*李龍第*/,
"（我寧願站在這裡摟抱著這石柱，與它同亡。）"/*李龍第*/,
"水勢逐漸增大著，眼看就要被沖走之際，李龍第會怎麼做？"/*選擇*/,
"人群搭了一座能上屋頂的長梯，他們急忙搶著爬上去。",
"李龍第聽到沉重落水的聲音，呻吟、央求的聲音。",
"他循聲看見一個軟弱女子的影子趴在梯級的下面。",
"看到女子趴在梯級的下面，李龍第會怎麼反應？"/*選擇*/,
"李龍第前去攙扶女子，將她揹上屋頂，用雨衣包住了她。",
"他端詳起懷裡的女子，看見她臉色蒼白，雙唇無意識地顫抖著，一副病懨懨的模樣。",
"黑暗裡，屋脊上無數個黑影或是蠢動，或是沉默地坐著，一直到了日出，李龍第才看清楚了周遭的人們。",
"首先迎上的是在對面屋頂上的一雙熟悉的黑色眼睛，他試圖平復自己內心的驚慌與喜悅。",
"在李龍第感覺到懷裡的女人正在動顫的同時，對岸那個女人猛然站起身喜悅地喊起了他的名字。",
"李龍第低頭，正迎著一對他相似熟識的黑色眼睛。",
"懷中的女人先是愣了一下，接著掙扎起來。","面對女人的掙扎，李龍第會怎麼反應？"/*選擇*/,
"妳在生病，我們一起處在災難中，妳要聽我的話！"/*李龍第*/,
"（晴子，我但願妳已經被水沖走或是被人們踐踏死去。）"/*李龍第*/,
"（現在妳出現在彼岸，而我在這裡，中間橫著一條不能跨越的鴻溝。）"/*李龍第*/,
"（現在，我若要呼應妳，則我就必須拋開我的責任。）"/*李龍第*/,
"李龍第聽見對面的晴子持續呼喚著他。","面對晴子的呼喚，李龍第會怎麼反應？"/*選擇*/,
"妳現在感覺怎麼樣？"/*李龍第*/,"你抱著我，我感到羞赧。"/*女子*/,"女子掙扎著想要獨自坐起來，但卻感到頭暈不穩，李龍第只好讓她偎著。",
"我想要回家，我死也要回家去——"/*女子*/,"水究竟退走了嗎？"/*女子*/,"它可能漸漸退去，也可能漸漸高漲起來。"/*李龍第*/,
"李龍第聽到晴子呼喊無效後的咒罵，除了李龍第外，其他人都以為她瘋了。","李龍第懷中的女人無力地喃喃自語起來。",
"面對晴子的咒罵，李龍第會怎麼反應？"/*選擇*/,
"即使水不來淹死我，我也會餓死。"/*女子*/,"李龍第從口袋掏出麵包，同時對面的晴子歇斯底里地喊叫了起來。",
"那是我的綠色雨衣，我的，那是我一貫在吃的葡萄乾麵包！"/*晴子*/,
"昨夜我們約定在戲院相見，所有現在的那個女人佔有的，全是我的……"/*晴子*/,
"這個麵包雖然沾濕了，但水分是經過雨衣過濾的。"/*李龍第*/,
"李龍第用手撕了一小片麵包放入女子的嘴裡。","女子一邊吃著一邊注意到對面屋頂上那位狂叫的女人的話語。",
"那個女人指的是我們嗎？"/*女子*/,"李龍第點頭。","她說妳是她的丈夫是嗎？"/*女子*/,
"不是。"/*李龍第*/,"雨衣是她的嗎？"/*女子*/,"這是我扶起妳之前，在水中撿到的。"/*李龍第*/,
"她所說的麵包為什麼會相符？"/*女子*/,"巧合罷。"/*李龍第*/,"她真的不是你的妻子嗎？"/*女子*/,
"絕不是。"/*李龍第*/,"那麼你的妻子呢？"/*女子*/,"我沒有。"/*李龍第*/,
"女子相信他了，認為對面的女人是瘋子。","麵包沾濕了反而容易下嚥。"/*女子*/,
"天毀我們也助我們。"/*李龍第*/,"對面的晴子停止辱罵，倒歇在屋頂上哭泣。",
"幾個人過來問李龍第這件事，但他否定了一切。","大家都覺得晴子瘋了，再沒有人理會她。",
"（晴子，妳說我背叛了我們的關係，但唯一引起妳憤怒的是內心的嫉妒，不甘往昔的權益突然被另一個人取代）"/*李龍第*/,
"（我必須選擇在現況中上負起我做人的條件，必須負起一件使我感到存在的榮耀之責任。）"/*李龍第*/,
"（除非這條鴻溝消失了，我才可能返還給妳。）"/*李龍第*/,
"你不吃一點嗎？"/*女子*/,"面對女子的詢問，李龍第會怎麼反應？"/*選擇*/,
"李龍第的臉被一隻冰冷的手撫摸的時候，像從睡夢中醒來，他看看懷中的女人對她微笑。",
"你吃飽我再吃，我還沒有覺得餓。"/*李龍第*/,"你叫什麼名字？"/*女子*/,
"面對女子的詢問，李龍第會怎麼反應？"/*選擇*/,"亞茲別。"/*李龍第*/,
"那女人說你是李龍第。"/*女子*/,"李龍第是她丈夫的名字，可是我叫亞茲別，不是她丈夫。"/*李龍第*/,
"假如你是她的丈夫，你將怎樣？"/*女子*/,"我會放下妳，冒死泅過去。"/*李龍第*/,
"李龍第注意到對面的晴子，她正在央求救生舟把她載過來。",
"可是有人說她瘋了，於是救生舟的人沒有理會她。",
"李龍第看向女子","要是我拋下妳，妳會怎麼樣？"/*李龍第*/,
"我會躺在屋頂上，慢慢死去。我在這個大都市也原是一個人的，而且正在生病。"/*女子*/,
"妳在城裡做什麼事？"/*李龍第*/,"我是一名妓女。"/*女子*/,"在水災前的那一刻，妳正要做什麼？"/*李龍第*/,
"我要到車站搭火車回鄉下，但我沒想到來不及了。"/*女子*/,"為什麼妳想要回家？"/*李龍第*/,
"我對我的生活感到心灰意冷，我感到絕望，所以我想要回家鄉去。"/*女子*/,
"李龍第沉默下來。對面的晴子坐在那裡自言自語地細說起了往事。",
"在晴子低語過去的往事時，李龍第會怎麼反應？"/*選擇*/,
"（是的，人常常把往事的境遇拿來在現在當成索求的藉口。）"/*李龍第*/,
"（當沒有索求到什麼時，便又感到痛苦。）"/*李龍第*/,
"（人往往是無恥地不斷拿往事來欺詐現在，為什麼人在每一個現在中不能企求新的生活意義呢？）"/*李龍第*/,
"我愛你，亞茲別。"/*女子*/,"女子雙手驀然捧起了李龍第的頭吻他，而他靜靜地讓她熱烈地吻著。",
"一道落水的聲音使李龍第和她懷中的女人的親吻分開來。","晴子面露極大的痛恨，在水裡想泅過來。",
"然而晴子被迅速退走的水流帶走了。","一艘救生舟緊隨著她追過去，人與舟逐漸在李龍第眼中消失了。",
"你為什麼流淚？"/*女子*/,"我對人會死亡憐憫。"/*李龍第*/,
"女人伸出手臂，手指溫柔地把李龍第面頰的眼淚擦掉。",
"現在不要理會我，我流淚和現在愛護妳同樣是我的本性。"/*李龍第*/,
"李龍第把最後一片麵包給她，她用撫摸過淚水的手夾住麵包吃了起來。",
"我嘗到了眼淚，有點鹹。"/*女子*/,"被大水困住的第二個夜晚。",
"（晴子，現在妳看不到我了，妳的心會獲得平靜，我希望妳還活著。）"/*李龍第*/,
"水退走了，這場災禍來得快也去得快。","天明的時候，只留下李龍第還在屋頂上緊緊地抱著那女人。",
"他們從屋頂上下來，走到火車站。","月台上，女子想把雨衣脫下來還給李龍第，他囑她這樣穿回家去。",
"李龍第接著想到還有一件東西，他把香花從口袋拿了出來。",
"因為一直滋潤著水分，它依然新鮮地盛開著。","他將花插在那女子的頭髮上。",
"火車開走了，李龍第慢慢地走出車站。","李龍第想念起了他的妻子晴子，關心她的下落。",
"（我要好好地休息幾天，躺在床上靜養體力）"/*李龍第*/,
"（在這樣龐大雜亂的城市，要尋回晴子，不是一個倦乏的人能勝任的。）"/*李龍第*/];
const dialogueNumber = ["a10000011000","a00000021000","a10000032000",
"a10000042000","a10000052000","a20000066000","a00000076000",
"a00000086000","a00000093000","a10000103000","a11000114000",
"a10000124000","a10000134000","a10000143000","a10000153000",
"a00000163000","a10000173000","a10000183000","a10000193000",
"a10000202000","a10000215000","a10000225000","a10000235001",
"a10000246000","a11400256000","a10410266000","a11400276000",
"a10410286000","a11400296000","a10000306002","a10000315000",
"a10000325000","a10000335000","a10000345000","a11000355000",
"a11000365000","a10000375003","a00000385000","a10000395000",
"a10300405000","a10000415004","a10300427000","a10300437000",
"a10000447000","a10200457000","a10200467000","a10300477000",
"a10300487000","a10000497005","a11300507000","a11300517000",
"a11300527000","a11300537000","a10300547000","a10000557006",
"a11300567000","a10310577000","a10300587000","a10310597000",
"a10310607000","a11300617000","a10000627000","a10300637000",
"a10000647007","a10310657000","a10300667000","a21000677000",
"a21000687000","a11300697000","a10300707000","a10300717000",
"a10310727000","a10300737000","a10310747000","a11300757000",
"a10310767000","a11300777000","a10310787000","a11300797000",
"a10310807000","a11300817000","a10310827000","a11300837000",
"a10300847000","a10310857000","a11300867000","a20000877000",
"a10000887000","a00000897000","a11000907000","a11000917000",
"a11000927000","a10310937000","a10000947008","a10300957000",
"a11300967000","a10310977000","a10000987009","a11300997000",
"a10311007000","a11301017000","a10311027000","a11301037000",
"a10201047000","a00001057000","a10301067000","a11301077000",
"a10311087000","a11301097000","a10311107000","a11301117000",
"a10311127000","a11301137000","a10311147000","a10201157000",
"a10001167010","a10001177000","a10001187000","a10001197000",
"a10311207000","a10301217000","a10301227000","a21001237000",
"a00001247000","a00001257000","a10311267000","a11301277000",
"a10301287000","a11301297000","a10301307000","a10311317000",
"a10301327000","a11001337000","a00001347000","a10301357000",
"a10301367000","a10301378000","a10301388000","a10301398000",
"a10001408000","a10001415000","a10001425000","a11001435000",
"a11001445000"];
var storyComplete = [];
const backdrop = ["frontcover.jpg","busshelter.jpg","onbus.jpg","theater.jpg","bakery.jpg",
"street.jpg","specialty.jpg","roof.jpg","platform.jpg"];
for (let i = 1; i <= 143; i++) {
  storyComplete.push(0);
}
const be_1 = ["李龍第在回家的路上經過一戶人家，裡頭的夫妻正在爭吵，突然間，一個收音機飛出窗外。",
"李龍第抬頭，看見那個黑影正高速地朝著自己墜落而來——"];
const be_2 = ["李龍第在走回家的路上，雨勢漸漸磅礡起來。","因為這突如其來的災難，城市像是變了一種模樣。",
"汽車彷彿沒了駕駛，一輛又一輛地在馬路胡亂地疾駛著。","李龍第沉浸在這末日之中的悲哀，倏忽有一瞬尖銳的高鳴隨著喇叭聲，以無法反應的極短的瞬間朝他襲來——"]
const be_3 = ["李龍第等著晴子赴約，看著人們踐踏彼此，心裡油然而生一種厭惡與不屑。",
"他依附著石柱。隨著時間的流逝，水淹得愈來愈高。",
"李龍第死命抱著那石柱，最後在水底失去了呼吸。"];
const be_4 = ["李龍第決定自己爬上屋頂。",
"可當他實際踏上屋頂，看著女子因為虛弱而無法爬上梯子，在下方不斷掙扎的畫面，對自己剛才的行為感到愧疚。",
"他不甘成為同樣無情的人，決定要幫助女子，但因體力不支加上人潮漸多而被大水沖走。"];
const be_5 = ["李龍第不耐煩地叫女子安靜，然而面對陌生男子的斥責女子受到驚嚇，情緒失控推搡他，導致李龍第摔下屋頂。"];
const be_6 = ["李龍第接過麵包，由於餓太久的緣故，吃一口後他生存的本能被引動，開始展現那野獸般的進食。",
"結果狼吞虎嚥之下突然噎到，可女子根本沒有力氣使用哈姆立克法幫助他，於是李龍第就這樣窒息而死了。"];
const be_7 = ["李龍第，我叫李龍第……李龍第。"/*李龍第*/,"但你剛才說你不是對面那個女子的丈夫，你說她是個瘋子，你說你沒有妻子。"/*女子*/,
"你說我們一起處在災難中。"/*女子*/,"對……我們一起處在災難之中。"/*李龍第*/,"我沒有妻子……"/*李龍第*/,"不……"/*李龍第*/,
"我有……"/*李龍第*/,"不……"/*李龍第*/,"你究竟是誰？"/*女子*/,"我究竟是誰？我究竟想成為誰？"/*李龍第*/,"我救了你在這大水中。"/*李龍第*/,
"你該依靠我，我們在這大水中，我會成為你的依靠。"/*李龍第*/,"我是我。我是李龍第，我能救你，你要愛我。"/*李龍第*/,
"我們是現在彼此的生活意義。"/*李龍第*/,"但你有妻子，她才是你的生活意義。"/*女子*/,"不。那不是現在。"/*李龍第*/,"現在……現在……"/*李龍第*/,
"現在這條巨大而凶險的鴻溝。"/*李龍第*/,"現在我們是彼此的生活意義。"/*李龍第*/,"不。"/*女子*/,"不。"/*李龍第*/,
"李龍第癲狂的在屋頂上走著，嘴裡不停喃喃自語。","現在……現在……"/*李龍第*/,"分不清現實，屋頂、大水、鴻溝，李龍第走向屋頂的邊緣。",
"這是我們現在的鴻溝。"/*李龍第*/,"這是我們的現在。"/*李龍第*/,"指著鴻溝，李龍第向前，墜入水中。",
"恰好經過的救生舟看見了他，肌肉猛男搜救隊長救起李龍第，他那深邃的黑眼珠，李龍第就這麼凝視著。","這是我們的現在。"/*李龍第*/];
const be_8 = ["晴子一氣之下跳入水中，發了瘋似的游到對岸，揪起李龍第的領子，兩人開始爭吵。",
"推搡間兩人離屋頂邊緣越來越近，不知是誰的腳一滑，雙雙墜入河流裡。","兩天後，被人們發現晴子緊抱著李龍第死在了郊區之中。"];
const fateChoose = ["回家","回家","抱著柱子","自己爬上屋頂","斥責她","沉默","沉默","吃一口","說實話","撇過頭去",
"上前詢問","回到街道","爬上屋頂","救她","安撫她","低頭看懷中的女子","抱緊女子","給女人先吃","說謊","垂頭傾聽"];
const bename = ["壞結局  天外奇機","壞結局  天雨路滑","壞結局  尾生抱柱","壞結局  過了就不再回來",
"壞結局  我摔到分手","壞結局  麵包裡有晴子的靈壓","壞結局  男上加男","壞結局  「晴」你去死"];
const betext = [be_1,be_2,be_3,be_4,be_5,be_6,be_7,be_8];
const be_1num = ["a10000015001","a10000025002"];
const be_2num = ["a10000015000","a10000025000",
"a10000035001","a10000045002"];
const be_3num = ["a10000015000","a10000025001","a10000035002"];
const be_4num = ["a10000015000","a10300027001","a10300035002"];
const be_5num = ["a10300017002"];
const be_6num = ["a10000017001","a10000027002"];
const be_7num = ["a11300017000","a10310027000","a10310037000",
"a11300047000","a11300057000","a11300067000","a11300077000",
"a11300087000","a10310097000","a11300107000","a11300117000",
"a11300127000","a11300137000","a11300147000","a10310157000",
"a11300167000","a11300177000","a11300187000","a11300197000",
"a10310207000","a11300217000","a10000227000","a11000237000",
"a10000247000","a11000257000","a11000267000","a10000277000",
"a10000287001","a11000297002"];
const be_8num = ["a10200017000","a10200027001","a10200037002"];
const allbenum = [be_1num,be_2num,be_3num,be_4num,be_5num,be_6num,be_7num,be_8num];
//正式開始
var n = 1000
function Game(){
  nextButton.style.display = "none";
  plot = dialogueNumber[k];
  if(k != 1){
    if(parseInt(plot.charAt(8),10) != backgroundNumber){
      backgroundNumber = parseInt(plot.charAt(8),10);
      document.body.style.backgroundImage = "url('" + backdrop[backgroundNumber] + "')";
    }
  }
  function RuleDisplay(usecode){
    var rulenumber = 0;
    var mainrule = 0;
    var secondrule = 0;
    if(parseInt(usecode.charAt(1),10) != 0){
      rulenumber++;
      mainrule = parseInt(usecode.charAt(1),10);
      if(parseInt(usecode.charAt(3),10) != 0){
        rulenumber++;
        secondrule = parseInt(usecode.charAt(3),10);
      }
    }
    if(rulenumber == 0){
      ruleone.style.display = "none";
      ruletwo.style.display = "none";
      rulethree.style.display = "none";
      rn[0].style.display = "none";
    }
    else if(rulenumber == 1){
      ruleone.style.display = "none";
      ruletwo.style.display = "none";
      rulethree.style.display = "block";
      if(parseInt(usecode.charAt(2),10) != 0){
        rn[0].style.display = "flex";
        ruleName.innerHTML = allRule[mainrule-1];
        if(mainrule != 4){
          if(mainrule == 2 && k>56){
            rulethree.style.backgroundImage = "url('" + allruleImg[3] + "')";
          }
          else{
          rulethree.style.backgroundImage = "url('" + allruleImg[mainrule-1] + "')";
          }
        }
      }
      else{
        rn[0].style.display = "none";
        rulethree.style.opacity = "1";
        ruleName.innerHTML = "";
        if(mainrule == 2 && k>56){
          rulethree.style.backgroundImage = "url('" + allruleImg[7] + "')";
        }
        else{
        rulethree.style.backgroundImage = "url('" + allruleImg[mainrule+3] + "')";
        }
      }
    }
    else{
      ruleone.style.display = "block";
      ruletwo.style.display = "block";
      rulethree.style.display = "none";
      if(parseInt(usecode.charAt(2),10) != 0){
        rn[0].style.display = "flex";
        ruleName.innerHTML = allRule[mainrule-1];
        ruleone.style.opacity = "1";
        if(secondrule == 2 && k > 56){
          rulethree.style.backgroundImage = "url('" + allruleImg[3] + "')";
        }
        else{
          ruleone.style.backgroundImage = "url('" + allruleImg[mainrule-1] + "')";
        }
      }
      else{
        if(parseInt(usecode.charAt(4),10) == 0){rn[0].style.display = "none";ruleName.innerHTML = "";}
        ruleone.style.opacity = "1";
        if(secondrule == 2 && k>56){
          rulethree.style.backgroundImage = "url('" + allruleImg[7] + "')";
        }
        else{
        ruleone.style.backgroundImage = "url('" + allruleImg[mainrule+3] + "')";
        }
      }
      if(parseInt(usecode.charAt(4),10) != 0){
        rn[0].style.display = "flex";
        ruleName.innerHTML = allRule[secondrule-1];
        ruletwo.style.opacity = "1";
        if(secondrule != 4){
          if(secondrule == 2 && k>56){
            ruletwo.style.backgroundImage = "url('" + allruleImg[3] + "')";
          }
          else{
          ruletwo.style.backgroundImage = "url('" + allruleImg[secondrule-1] + "')";
          }
        }
        else{
          ruletwo.style.display = "none";
        }
      }
      else{
        if(parseInt(usecode.charAt(2),10) == 0){rn[0].style.display = "none";ruleName.innerHTML = "";}
        ruletwo.style.opacity = "1";
        if(secondrule != 4){
          if(secondrule == 2 && k>56){
            ruletwo.style.backgroundImage = "url('" + allruleImg[7] + "')";
          }
          else{
            ruletwo.style.backgroundImage = "url('" + allruleImg[secondrule+3] + "')";
          }
        }
        else{
          ruletwo.style.display = "none";
        }
      }
    }
  }
  ifchoose = parseInt(plot.charAt(10),10)*10 + parseInt(plot.charAt(11),10);
  RuleDisplay(plot);
  talkNumber = k
  ruleTalk = dialogueText[talkNumber];
  TypeText(ruleTalk).then(delay(2)).then(function(){
    var nextpart = function(){
      if(k == 143){
        img.style.display = "flex";
        img.classList.add("imganimate");
        start.style.display = "block";
        goBack.style.display = "block";
        start.style.top = "50%";
        start.style.color = "#fff";
        music.style.display = "none";
        eaudio.volume = 0.3;
        start.innerHTML = "結局  雨停了";
        about.style.display = "block"
        var restart = function(){
          goBack.removeEventListener("click",restart,false);
          k = 0;
          goBack.style.display = "none";
          start.style.display = "none";
          about.style.display = "none";
          Shine().then(function(){
            img.classList.remove("imganimate")
            music.style.display = "inline";
            dialog.innerHTML = "";
            Game();
          })
        }
        goBack.addEventListener("click",restart,false);
      }
      else{
        dialogue[0].removeEventListener("click",nextpart,false);
        choseone.style.display = "none";
        chosetwo.style.display = "none";
        nextButton.style.display = "none";
        k++
        dialog.innerHTML = "";
        Game()
      }
    }
    if(ifchoose != 0){
      choseone.value = fateChoose[ifchoose-1];
      chosetwo.value = fateChoose[ifchoose+9];
      choseone.style.display = "block";
      chosetwo.style.display = "block";
      var fateone = function(){
        choseone.removeEventListener("click",fateone,false);
        chosetwo.removeEventListener("click",fatetwo,false);
        choseone.style.display = "none";
        chosetwo.style.display = "none";
        if(ifchoose == 6){
          choseone.style.display = "none";
          chosetwo.style.display = "none";
          nextButton.style.display = "none";
          k++;
          dialog.innerHTML = "";
          Game();
        }
        else if(ifchoose == 7){
          choseone.style.display = "none";
          chosetwo.style.display = "none";
          nextButton.style.display = "none";
          k++;
          dialog.innerHTML = "";
          Game();
        }
        else{
          l = 0;
          bego = ifchoose - 1;
          if(ifchoose == 10){
            function BadEnd8(){
              bes = allbenum[7][l];
                if(parseInt(bes.charAt(8),10) != backgroundNumber){
                  backgroundNumber = parseInt(bes.charAt(8),10);
                  document.body.style.backgroundImage = "url('" + backdrop[backgroundNumber] + "')";
                }
              RuleDisplay(bes);
              talkNumber = parseInt(bes.charAt(5),10)*100 + parseInt(bes.charAt(6),10)*10 + parseInt(bes.charAt(7),10) - 1;
              ruleTalk = betext[7][talkNumber];
              TypeText(ruleTalk).then(delay(2)).then(function(){
                var benextpart = function(){
                  if(parseInt(bes.charAt(11),10) == 1){
                    Shine().then(function(){
                      dialogue[0].removeEventListener("click",benextpart,false);
                      nextButton.style.display = "none";
                      l++;
                      dialog.innerHTML = "";
                      BadEnd8();
                    });
                  }
                  else if(parseInt(bes.charAt(11),10) == 2){
                    dialogue[0].removeEventListener("click",benextpart,false);
                    nextButton.style.display = "none";
                    dialog.innerHTML = "";
                    dark(bename[7]).then(function(){
                      Game();
                    });
                  }
                  else{
                    dialogue[0].removeEventListener("click",benextpart,false);
                    nextButton.style.display = "none";
                    l++
                    dialog.innerHTML = "";
                    BadEnd8()
                  }
                }
                nextButton.style.display = "block";
                dialogue[0].addEventListener("click",benextpart,false);
              })
            }
            BadEnd8()
          }
          else if(ifchoose == 9){
            function BadEnd7(){
              bes = allbenum[6][l];
                if(parseInt(bes.charAt(8),10) != backgroundNumber){
                  backgroundNumber = parseInt(bes.charAt(8),10);
                  document.body.style.backgroundImage = "url('" + backdrop[backgroundNumber] + "')";
                }
              RuleDisplay(bes);
              talkNumber = parseInt(bes.charAt(5),10)*100 + parseInt(bes.charAt(6),10)*10 + parseInt(bes.charAt(7),10) - 1;
              ruleTalk = betext[6][talkNumber];
              TypeText(ruleTalk).then(delay(2)).then(function(){
                var benextpart = function(){
                  if(parseInt(bes.charAt(11),10) == 1){
                    Shine().then(function(){
                      dialogue[0].removeEventListener("click",benextpart,false);
                      nextButton.style.display = "none";
                      l++;
                      dialog.innerHTML = "";
                      BadEnd7();
                    });
                  }
                  else if(parseInt(bes.charAt(11),10) == 2){
                    dialogue[0].removeEventListener("click",benextpart,false);
                    nextButton.style.display = "none";
                    dialog.innerHTML = "";
                    dark(bename[6]).then(function(){
                      Game();
                    });
                  }
                  else{
                    dialogue[0].removeEventListener("click",benextpart,false);
                    nextButton.style.display = "none";
                    l++
                    dialog.innerHTML = "";
                    BadEnd7()
                  }
                }
                nextButton.style.display = "block";
                dialogue[0].addEventListener("click",benextpart,false);
              })
            }
            BadEnd7()
          }
          else if(ifchoose == 8){
            function BadEnd6(){
              bes = allbenum[5][l];
                if(parseInt(bes.charAt(8),10) != backgroundNumber){
                  backgroundNumber = parseInt(bes.charAt(8),10);
                  document.body.style.backgroundImage = "url('" + backdrop[backgroundNumber] + "')";
                }
              RuleDisplay(bes);
              talkNumber = parseInt(bes.charAt(5),10)*100 + parseInt(bes.charAt(6),10)*10 + parseInt(bes.charAt(7),10) - 1;
              ruleTalk = betext[5][talkNumber];
              TypeText(ruleTalk).then(delay(2)).then(function(){
                var benextpart = function(){
                  if(parseInt(bes.charAt(11),10) == 1){
                    Shine().then(function(){
                      dialogue[0].removeEventListener("click",benextpart,false);
                      nextButton.style.display = "none";
                      l++;
                      dialog.innerHTML = "";
                      BadEnd6();
                    });
                  }
                  else if(parseInt(bes.charAt(11),10) == 2){
                    dialogue[0].removeEventListener("click",benextpart,false);
                    nextButton.style.display = "none";
                    dialog.innerHTML = "";
                    dark(bename[5]).then(function(){
                      Game();
                    });
                  }
                  else{
                    dialogue[0].removeEventListener("click",benextpart,false);
                    nextButton.style.display = "none";
                    l++
                    dialog.innerHTML = "";
                    BadEnd6()
                  }
                }
                nextButton.style.display = "block";
                dialogue[0].addEventListener("click",benextpart,false);
              })
            }
            BadEnd6()
          }
          else{
            function BadEnd(){
              bes = allbenum[bego][l];
                if(parseInt(bes.charAt(8),10) != backgroundNumber){
                  backgroundNumber = parseInt(bes.charAt(8),10);
                  document.body.style.backgroundImage = "url('" + backdrop[backgroundNumber] + "')";
                }
              RuleDisplay(bes);
              talkNumber = parseInt(bes.charAt(5),10)*100 + parseInt(bes.charAt(6),10)*10 + parseInt(bes.charAt(7),10) - 1;
              ruleTalk = betext[bego][talkNumber];
              TypeText(ruleTalk).then(function(){
                var benextpart = function(){
                  if(parseInt(bes.charAt(11),10) == 1){
                    Shine().then(function(){
                      dialogue[0].removeEventListener("click",benextpart,false);
                      nextButton.style.display = "none";
                      l++;
                      dialog.innerHTML = "";
                      BadEnd();
                    });
                  }
                  else if(parseInt(bes.charAt(11),10) == 2){
                    dialogue[0].removeEventListener("click",benextpart,false);
                    nextButton.style.display = "none";
                    dialog.innerHTML = "";
                    dark(bename[bego]).then(function(){
                      Game();
                    });
                  }
                  else{
                    dialogue[0].removeEventListener("click",benextpart,false);
                    nextButton.style.display = "none";
                    l++;
                    dialog.innerHTML = "";
                    BadEnd();
                  }
                }
                nextButton.style.display = "block";
                dialogue[0].addEventListener("click",benextpart,false);
              })
            }
            BadEnd()
          }
        }
      }
      var fatetwo = function(){
        chosetwo.removeEventListener("click",fatetwo,false);
        choseone.removeEventListener("click",fateone,false);
        choseone.style.display = "none";
        chosetwo.style.display = "none";
        nextButton.style.display = "none";
        k++;
        dialog.innerHTML = "";
        Game();
      }
      choseone.addEventListener("click",fateone,false);
      chosetwo.addEventListener("click",fatetwo,false);
    }
    else{
        nextButton.style.display = "block";
        dialogue[0].addEventListener("click",nextpart,false);
    }
  })
}