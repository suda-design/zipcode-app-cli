// 1. 画面の要素を取得する
const searchBtn = document.getElementById("searchBtn");
const zipcodeInput = document.getElementById("zipcode");
const resultwrapper = document.getElementById("result");

// 2. ボタンがクリックされた時の動きを決める
searchBtn.addEventListener("click", () => {
  // 入力された郵便番号を取得
  const zipcode = zipcodeInput.value;
  if (zipcode.length !== 7) {
    resultwrapper.textContent = "7桁の数字を入力してください。";
    return;
  }
  // APIのURLを作成（zipcloudという無料APIを使います）
  const url = `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipcode}`;

  // 3. fetchを使って外部からデータを取ってくる
  fetch(url)
    .then((response) => {
      // サーバーから返事をJSON形式（プログラムで扱いやすいデータ）に変換
      return response.json();
    })
    .then((data) => {
      // データが取れた後の処理
      console.log(data); // どんなデータが来たか確認用（F12ツールのコンソールで見れます）

      if (data.results === null) {
        // 該当する住所がない場合
        resultwrapper.textContent = "住所が見つかりませんでした。";
      } else {
        // 住所が見つかった場合
        // data.results[0]の中に住所情報が入っています
        const address1 = data.results[0].address1; // 都道府県
        const address2 = data.results[0].address2; // 市区町村
        const address3 = data.results[0].address3; // 町域

        // 画面に表示するテキストを作る
        const fullAddress = `${address1}${address2}${address3}`;

        // 画面を書き換える
        resultwrapper.textContent = fullAddress;
      }
    })
    .catch((error) => {
      // 通信エラーなどが起きた場合
      console.error("エラー:", error);
      resultwrapper.textContent = "エラーが発生しました。";
    });
});
