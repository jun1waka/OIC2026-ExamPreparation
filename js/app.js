// 即時実行関数でグローバルスコープの汚染を防ぎます
(async function() {
    'use strict';

    // 課題を格納する配列
    const challenges = [
        {
            title: '31. 配列の重複を削除',
            func: () => {
                const array = [1, 2, 'a', 2, 3, 'b', 'a', 4, 5, 5];
                const uniqueArray = [...new Set(array)];
                return `元の配列: [${array.join(', ')}]\n重複削除後: [${uniqueArray.join(', ')}]`;
            }
        },
        {
            title: '32. 文字列内の文字数カウント',
            func: () => {
                const text = 'abracadabra';
                const char = 'a';
                const count = text.split(char).length - 1;
                return `「${text}」の中の「${char}」の数は ${count} 個です。`;
            }
        },
        {
            title: '33. 配列のシャッフル',
            func: () => {
                const array = [1, 2, 3, 4, 5];
                const original = `元の配列: [${array.join(', ')}]`;
                // Fisher-Yates shuffle
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
                return `${original}\nシャッフル後: [${array.join(', ')}]`;
            }
        },
        {
            title: '34. オブジェクトの配列をソート',
            func: () => {
                const users = [
                    { name: 'Bob', age: 30 },
                    { name: 'Alice', age: 25 },
                    { name: 'Charlie', age: 35 }
                ];
                users.sort((a, b) => a.age - b.age);
                return users;
            }
        },
        {
            title: '35. 回文（パリンドローム）判定',
            func: () => {
                const checkPalindrome = (str) => {
                    const reversed = str.split('').reverse().join('');
                    return str === reversed;
                };
                const str1 = 'level';
                const str2 = 'hello';
                return `「${str1}」は回文か？ -> ${checkPalindrome(str1)}\n「${str2}」は回文か？ -> ${checkPalindrome(str2)}`;
            }
        },
        {
            title: '36. フィボナッチ数列',
            func: () => {
                const fibonacci = (n) => {
                    if (n <= 1) return n;
                    let a = 0, b = 1;
                    for (let i = 2; i <= n; i++) {
                        [a, b] = [b, a + b];
                    }
                    return b;
                };
                const n = 10;
                return `フィボナッチ数列の${n}番目は ${fibonacci(n)} です。`;
            }
        },
        {
            title: '37. JSONとオブジェクトの変換',
            func: () => {
                const obj = { id: 1, name: 'Taro', isStudent: true };
                const jsonString = JSON.stringify(obj, null, 2);
                const parsedObj = JSON.parse(jsonString);
                return `オブジェクト -> JSON:\n${jsonString}\n\nJSON -> オブジェクトのid: ${parsedObj.id}`;
            }
        },
        {
            title: '38. setTimeoutによる遅延実行',
            func: (card) => {
                const resultDiv = card.querySelector('.result');
                resultDiv.textContent = '3秒後にコンソールにメッセージが表示されます。';
                setTimeout(() => {
                    console.log('課題38: 3秒経過しました！');
                }, 3000);
                return null;
            }
        },
        {
            title: '39. setIntervalによる繰り返し実行',
            func: (card) => {
                const resultDiv = card.querySelector('.result');
                resultDiv.textContent = '2秒ごとにコンソールに時刻が表示されます（10秒後に停止）。';
                let count = 0;
                const intervalId = setInterval(() => {
                    console.log(`課題39: ${new Date().toLocaleTimeString()}`);
                    count++;
                    if (count >= 5) {
                        clearInterval(intervalId);
                        console.log('課題39: 停止しました。');
                    }
                }, 2000);
                return null;
            }
        },
        {
            title: '40. 例外処理 try...catch',
            func: () => {
                try {
                    // 存在しない関数を呼び出してエラーを発生させる
                    nonExistentFunction();
                } catch (error) {
                    return `エラーをキャッチしました:\n- 名前: ${error.name}\n- メッセージ: ${error.message}`;
                }
            }
        },
        {
            title: '41. 現在の日付を指定フォーマットで表示',
            func: () => {
                const now = new Date();
                const year = now.getFullYear();
                const month = String(now.getMonth() + 1).padStart(2, '0');
                const day = String(now.getDate()).padStart(2, '0');
                return `今日は ${year}-${month}-${day} です。`;
            }
        },
        {
            title: '42. 配列内の最大値・最小値',
            func: () => {
                const numbers = [10, 2, 8, 42, 1, 99];
                let max = numbers[0];
                let min = numbers[0];
                for (let i = 1; i < numbers.length; i++) {
                    if (numbers[i] > max) max = numbers[i];
                    if (numbers[i] < min) min = numbers[i];
                }
                return `配列 [${numbers.join(', ')}]\n最大値: ${max}, 最小値: ${min}`;
            }
        },
        {
            title: '43. 2つの配列の共通要素',
            func: () => {
                const arr1 = [1, 2, 3, 4, 5];
                const arr2 = [4, 5, 6, 7, 8];
                const common = arr1.filter(item => arr2.includes(item));
                return `配列1: [${arr1.join(', ')}]\n配列2: [${arr2.join(', ')}]\n共通要素: [${common.join(', ')}]`;
            }
        },
        {
            title: '44. キャメルケースとスネークケースの変換',
            func: () => {
                const snake = 'hello-world-javascript';
                const camel = snake.split('-').map((word, index) => {
                    return index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1);
                }).join('');
                return `変換前: ${snake}\n変換後: ${camel}`;
            }
        },
        {
            title: '45. 素数判定',
            func: () => {
                const isPrime = (num) => {
                    if (num <= 1) return false;
                    for (let i = 2; i <= Math.sqrt(num); i++) {
                        if (num % i === 0) return false;
                    }
                    return true;
                };
                const n1 = 17, n2 = 18;
                return `${n1}は素数か？ -> ${isPrime(n1)}\n${n2}は素数か？ -> ${isPrime(n2)}`;
            }
        },
        {
            title: '46. sliceとspliceの違い',
            func: () => {
                const arr1 = ['a', 'b', 'c', 'd', 'e'];
                const arr2 = [...arr1];
                
                const sliced = arr1.slice(1, 3); // 1番目から3番目の直前まで
                const spliced = arr2.splice(1, 2, 'X'); // 1番目から2つ削除し'X'を挿入

                return `元の配列: ['a', 'b', 'c', 'd', 'e']\n\n` +
                       `slice(1, 3)の結果: [${sliced.join(', ')}]\n` +
                       `slice後の元の配列: [${arr1.join(', ')}]\n\n` +
                       `splice(1, 2, 'X')の結果: [${spliced.join(', ')}]\n` +
                       `splice後の元の配列: [${arr2.join(', ')}]`;
            }
        },
        {
            title: '47. findとfilterの違い',
            func: () => {
                const users = [{id:1, name:'A'}, {id:2, name:'B'}, {id:3, name:'C'}];
                const found = users.find(u => u.id > 1);
                const filtered = users.filter(u => u.id > 1);
                return `findの結果 (要素): ${JSON.stringify(found)}\n` +
                       `filterの結果 (配列): ${JSON.stringify(filtered)}`;
            }
        },
        {
            title: '48. Object.entriesの利用',
            func: () => {
                const user = { name: 'Jiro', age: 40 };
                const entries = Object.entries(user);
                return entries;
            }
        },
        {
            title: '49. クラスの追加・削除・切り替え',
            func: (card) => {
                const resultDiv = card.querySelector('.result');
                const p = document.createElement('p');
                p.textContent = '下のボタンを押してください。';
                p.id = 'class-toggle-text';
                p.style.transition = 'all 0.3s';

                const btnAdd = document.createElement('button');
                btnAdd.textContent = 'クラス追加(赤色)';
                btnAdd.className = 'dom-button';
                btnAdd.addEventListener('click', () => {
                    p.classList.add('text-red-400');
                });

                const btnRemove = document.createElement('button');
                btnRemove.textContent = 'クラス削除';
                btnRemove.className = 'dom-button';
                btnRemove.addEventListener('click', () => {
                    p.classList.remove('text-red-400');
                });
                
                const btnToggle = document.createElement('button');
                btnToggle.textContent = 'クラス切替';
                btnToggle.className = 'dom-button';
                btnToggle.addEventListener('click', () => {
                    p.classList.toggle('text-red-400');
                });

                resultDiv.innerHTML = '';
                resultDiv.appendChild(p);
                resultDiv.appendChild(btnAdd);
                resultDiv.appendChild(btnRemove);
                resultDiv.appendChild(btnToggle);
                return null;
            }
        },
        {
            title: '50. フォーム入力値の取得',
            func: (card) => {
                const resultDiv = card.querySelector('.result');
                const input = document.createElement('input');
                input.type = 'text';
                input.placeholder = '何か入力してください';
                input.className = 'dom-input';
                
                const p = document.createElement('p');
                p.textContent = '入力値: ';

                input.addEventListener('input', (event) => {
                    p.textContent = `入力値: ${event.target.value}`;
                });
                
                resultDiv.innerHTML = '';
                resultDiv.appendChild(input);
                resultDiv.appendChild(p);
                return null;
            }
        },
        {
            title: '51. 正規表現によるメールアドレス検証',
            func: () => {
                const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
                const email1 = 'test@example.com';
                const email2 = 'invalid-email';
                return `${email1} -> ${regex.test(email1)}\n${email2} -> ${regex.test(email2)}`;
            }
        },
        {
            title: '52. 階乗の計算',
            func: () => {
                const factorial = (n) => {
                    if (n < 0) return '負の数は計算できません';
                    if (n === 0) return 1;
                    let result = 1;
                    for (let i = n; i > 0; i--) {
                        result *= i;
                    }
                    return result;
                }
                return `5! = ${factorial(5)}`;
            }
        },
        {
            title: '53. 多次元配列の平坦化',
            func: () => {
                const nested = [[1, 2], [3, 4, [5, 6]], 7];
                return `元の配列: ${JSON.stringify(nested)}\n` +
                       `flat(1): [${nested.flat().join(', ')}]\n` +
                       `flat(2): [${nested.flat(2).join(', ')}]`;
            }
        },
        {
            title: '54. URLクエリパラメータの解析',
            func: () => {
                const url = '?id=123&name=test&lang=js';
                const params = new URLSearchParams(url);
                const result = {
                    id: params.get('id'),
                    name: params.get('name'),
                    lang: params.get('lang')
                };
                return `クエリ: ${url}\n解析後: ${JSON.stringify(result)}`;
            }
        },
        {
            title: '55. ディープコピー（簡易版）',
            func: () => {
                const original = { a: 1, b: { c: 2 } };
                const copied = JSON.parse(JSON.stringify(original));
                copied.b.c = 99; // コピーを変更
                return `コピー元のb.c: ${original.b.c}\n` +
                       `コピー後のb.c: ${copied.b.c}`;
            }
        },
        {
            title: '56. イベントデリゲーション',
            func: (card) => {
                const resultDiv = card.querySelector('.result');
                resultDiv.innerHTML = `<p>下のボタンのどれかを押してください。</p>
                    <div id="parent-div" style="padding: 10px; border: 1px solid #ccc;">
                        <button class="dom-button">ボタン1</button>
                        <button class="dom-button">ボタン2</button>
                        <button class="dom-button">ボタン3</button>
                    </div>`;
                
                const parent = resultDiv.querySelector('#parent-div');
                parent.addEventListener('click', (event) => {
                    if (event.target.tagName === 'BUTTON') {
                        resultDiv.querySelector('p').textContent = `${event.target.textContent}がクリックされました。`;
                    }
                });
                return null;
            }
        },
        {
            title: '57. localStorageへの保存と読み込み',
            func: (card) => {
                const resultDiv = card.querySelector('.result');
                const key = 'myText';
                
                const input = document.createElement('input');
                input.className = 'dom-input';
                input.value = localStorage.getItem(key) || ''; // 保存された値を読み込む
                
                const saveBtn = document.createElement('button');
                saveBtn.textContent = '保存';
                saveBtn.className = 'dom-button';

                saveBtn.addEventListener('click', () => {
                    localStorage.setItem(key, input.value);
                    p.textContent = `「${input.value}」を保存しました。リロードして確認してください。`;
                });
                
                const p = document.createElement('p');
                p.textContent = 'テキストを入力して保存ボタンを押してください。';

                resultDiv.innerHTML = '';
                resultDiv.appendChild(input);
                resultDiv.appendChild(saveBtn);
                resultDiv.appendChild(p);
                return null;
            }
        },
        {
            title: '58. Promiseを使った非同期処理',
            func: (card) => {
                const resultDiv = card.querySelector('.result');
                resultDiv.textContent = '処理中...';
                
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        if (Math.random() > 0.5) {
                            resolve('成功しました！');
                        } else {
                            reject('失敗しました...');
                        }
                    }, 1000);
                })
                .then(message => {
                    resultDiv.textContent = `結果: ${message}`;
                    resultDiv.style.color = '#34d399'; // green-400
                })
                .catch(error => {
                    resultDiv.textContent = `結果: ${error}`;
                    resultDiv.style.color = '#f87171'; // red-400
                });
                return null;
            }
        },
        {
            title: '59. async/awaitを使った非同期処理',
            func: (card) => {
                const resultDiv = card.querySelector('.result');
                resultDiv.textContent = '処理中...';
                
                const promiseFunc = () => new Promise(resolve => {
                    setTimeout(() => resolve('async/awaitで成功！'), 1000);
                });

                const execute = async () => {
                    try {
                        const message = await promiseFunc();
                        resultDiv.textContent = `結果: ${message}`;
                    } catch (error) {
                        resultDiv.textContent = `エラー: ${error}`;
                    }
                };
                execute();
                return null;
            }
        },
        {
            title: '60. Web API (Fetch) の利用',
            func: async (card) => {
                const resultDiv = card.querySelector('.result');
                resultDiv.textContent = 'ユーザーデータを取得中...';
                try {
                    const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const user = await response.json();
                    resultDiv.textContent = `取得したユーザー名: ${user.name}\nメール: ${user.email}`;
                } catch (error) {
                    resultDiv.textContent = `データの取得に失敗しました: ${error.message}`;
                }
                return null;
            }
        }
    ];

    // --- ここから下は変更しないでください ---
    const resultsContainer = document.getElementById('results-container');
    if (!resultsContainer) {
        console.error('結果を表示するためのコンテナが見つかりません。');
        return;
    }

    challenges.forEach(async (challenge) => {
        const card = document.createElement('div');
        card.className = 'challenge-card';

        const title = document.createElement('h3');
        title.textContent = challenge.title;
        card.appendChild(title);

        const resultDiv = document.createElement('div');
        resultDiv.className = 'result';
        card.appendChild(resultDiv);

        resultsContainer.appendChild(card);
        
        try {
            // 非同期関数に対応
            const result = await Promise.resolve(challenge.func(card));
            
            if (result !== null && result !== undefined) {
                if (typeof result === 'object') {
                    resultDiv.textContent = JSON.stringify(result, null, 2);
                } else {
                    resultDiv.textContent = result;
                }
            }
        } catch (error) {
            console.error(`課題 "${challenge.title}" でエラーが発生しました:`, error);
            resultDiv.textContent = `エラーが発生しました: ${error.message}`;
            resultDiv.style.color = '#f87171';
        }
    });

})();
