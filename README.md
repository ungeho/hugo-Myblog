### Hugoを試しに触ってみるメモ

windows10
cmd(mingw)

で行った時のメモ

#### サイト構築

```
hugo new site siteName
```

#### ディレクトリ構造

.<br>
┣━━archetypes/<br>
┃       'hugo new' コマンドで生成するコンテンツのひな型格納場所<br>
┣━━content/<br>
┃       コンテンツ格納場所<br>
┣━━data/<br>
┃       JSONやYAML、TOML形式のデータ格納場所<br>
┣━━layouts/<br>
┃       themesのテーマを上書きするレイアウト格納場所<br>
┣━━static/<br>
┃       静的ファイル格納場所（メディアファイルなど）<br>
┣━━themes/<br>
┃       テーマ格納場所<br>
┗━━hugo.toml(config.toml)<br>
サイトの構成ファイル<br>

<!--
┣ ┠ ┝ ├
┫ ┨ ┥ ┤
│ ┃
─ ━
┌ ┏ ┓ ┐
└ ┗ ┛ ┘
-->

#### テーマの追加

hugoの PaperMod テーマを 'theme/PaperMod' フォルダに追加する。

```
git submodule add https://github.com/adityatelange/hugo-PaperMod.git themes/PaperMod
```

#### hugo.toml(config.toml)（サイトの構成ファイル）の追加と編集

※`v0.109.0`から設定ファイルは`hugo.toml`

設定ファイルを編集したい場合は、`hugo.toml`を編集

[PaperModの設定項目](https://github.com/adityatelange/hugo-PaperMod/wiki/Features "PaperMod-wiki")

[Tomlの書式](https://toml.io/ja/v0.5.0 "toml.io")

例えば、コードブロックにコピーボタンを追加したい場合は

`hugo.toml`に以下を追加する。

```
[params]
    ShowCodeCopyButtons = true
```


#### テーマの反映

`themes\PaperMod` にある `README.md`と`git関連`のファイル以外をコピーする。

サイト直下にコピーしたものを全て上書きする。

以下のコマンドでローカルで起動する事が出来る。

```
hugo server -D
```

-Dオプション、下書き(Draft)として定義したコンテンツもプレビュー結果に表示する。

#### Netlifyでデプロイ（公開）する。

`netlify.toml`を新規作成して

[Host on Netlify](https://gohugo.io/hosting-and-deployment/hosting-on-netlify/#configure-hugo-version-in-netlify "gohugo.io")を参考に

```
[build]
  publish = "public"
  command = "hugo --gc --minify"

  [build.environment]
    HUGO_VERSION = "0.121.2"

[context.production.environment]
  HUGO_ENV           = "production"
  HUGO_ENABLEGITINFO = "true"

[context.split1]
  command = "hugo --gc --minify --enableGitInfo"

  [context.split1.environment]
    HUGO_ENV = "production"

[context.deploy-preview]
  command = "hugo --gc --minify --buildFuture -b $DEPLOY_PRIME_URL"

[context.branch-deploy]
  command = "hugo --gc --minify -b $DEPLOY_PRIME_URL"

[context.next.environment]
  HUGO_ENABLEGITINFO = "true"

[[redirects]]
  from   = "/npmjs/*"
  to     = "/npmjs/"
  status = 200
```

のような内容をコピーして、`version`情報を自身のhugoに合わせて変更して保存

その後、Netlifyでアカウントを作成し、道なりに設定。

#### コンテンツの作成(記事の投稿)

hugoサイト直下で、以下のコマンドを実行することで

フォルダ`content/post`とファイル`content/post/my-first-post.md`を生成し、コンテンツを作成する。

```
hugo new posts/my-first-post.md
```

また、`archettypes/default.md`を編集する事で、投稿する記事のデフォルトの設定を変更できる。