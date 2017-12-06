# 安装方法
```bash
npm add zhuyadong/pomelo-ts
```
# 配置
* tsconfig.json
```json
"compilerOptions": {
    "baseUrl": "./",
    "paths": {
        "*": [
            "./node_modules/pomelo-ts/*",
            "*"
        ]
    },
    "typeRoots": ["node_modules/pomelo-ts", "node_modules/@types"]
}
```