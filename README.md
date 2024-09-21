# いんべんとり
エフェクターの発注管理、製品の在庫管理、パーツの在庫管理などができるアプリ

## 仕様技術
Laravelをベースに開発をする。

## ローカルサーバーについて
DockerでNginxを構築してそこからphpへプロキシしている。
Nginx側でhostnameを設定しているため、macの場合はetc/hostsファイルに以下を追記する

```
::1 in-ventory.internal
```