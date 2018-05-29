<!--
  This file was generated by emdaer

  Its template can be found at .emdaer/README.emdaer.md
-->

<!--
  emdaerHash:104015a724faa51bc34d79690d21e42e
-->

<p align="center"><img src="https://raw.githubusercontent.com/okaysoftware/iom/master/iom.svg?sanitize=true" alt="iom"></p>

<h1 id="iom-travis-bundlephobia-node-npm">iom · <a href="https://travis-ci.org/okaysoftware/iom/"><img src="https://img.shields.io/travis/okaysoftware/iom.svg?style=flat-square" alt="Travis"></a> <a href="https://bundlephobia.com/result?p=iom"><img src="https://img.shields.io/bundlephobia/minzip/iom.svg?style=flat-square" alt="bundlephobia"></a> <a href="http://npmjs.com/package/iom"><img src="https://img.shields.io/node/v/iom.svg?style=flat-square" alt="Node"></a> <a href="http://npmjs.com/package/iom"><img src="https://img.shields.io/npm/v/iom.svg?style=flat-square" alt="NPM"></a></h1>
<blockquote>
<p>iom is Esperanto for “a little” 😉</p>
</blockquote>
<h2 id="why">Why</h2>
<p>It’s a good question — why did I need to roll my own state management library?</p>
<p>First of all, I didn’t need to and other options may very well better suit your needs</p>
<p>But, since you asked:</p>
<ul>
<li>🐣 it’s tiny (~¼kB last time I checked) </li>
<li>🔤 it’s simple (one class whose instances surface only two methods)</li>
<li>🚀 it’s op af (caveat being that there’s no hand-holding whatsoever)</li>
</ul>
<h2 id="how">How</h2>
<h3 id="a-quick-example">A Quick Example</h3>
<p>If you’re wondering how state management can be over-powered…</p>
<h4 id="1-let-s-create-a-new-store-">1. Let’s create a new store…</h4>
<p>Import iom</p>

```js
import Store from 'iom';
```
<p>Describe the initial state… may as well save it somewhere, right?</p>

```js
const INITIAL_STATE = { on: false };
```
<p>Create the store by passing the initial state into the constructor</p>

```js
const store = new Store(INITIAL_STATE);
```
<p>Now you have a store</p>
<h4 id="2-and-subscribe-to-the-store-">2. And subscribe to the store…</h4>
<p>We’ll just send state updates to the console for now</p>

```js
const subscriber = console.log;
```
<p>Passing a subscriber to the store returns a function which cancels the subscription… let’s hang onto that</p>

```js
const cancel = store.subscribe(subscriber);
// => { on: false }
```
<p>All subscribers receive the current state when added to the store</p>
<h4 id="3-and-update-the-state-">3. And update the state…</h4>
<p>This is where iom likely diverges from state managers you’ve used before</p>
<p>You may notice that we haven’t talked at all about updating state yet</p>
<p>That’s because you can update state in anyway that you like at any point because actions are simply functions passed to the store which take the current state as their argument and return the new state</p>
<p>So let’s create an action</p>

```js
const toggleOn = state => ({ ...state, on: !state.on });
```
<p>And perform an update</p>

```js
store.update(toggleOn);
// => { on: true }
```
<p>And that’s iom!</p>
<h4 id="4-and-clean-up">4. And clean up</h4>
<p>You can add and remove subscribers at any point</p>
<p>So let’s cancel our subscription now that we’re done</p>

```js
cancel();
```
<h4 id="5-then-read-the-docs-">5. <a href="https://okaysoftware.github.io/iom/">Then read the docs!</a></h4>
<h3 id="purity-and-stack-safety">Purity and Stack Safety</h3>
<p>Purity and stack safety are up to you </p>
<h4 id="purity">Purity</h4>
<p>If you’re using a mutable data structure for your state, be mindful and don’t mutate it</p>
<h4 id="stack-safety">Stack Safety</h4>
<p>Don’t call actions from within subscribers or other actions or you are very likely to encounter infinite loops</p>
<hr>
<p>iom is <a href="./LICENSE">MIT licensed</a>.</p>
