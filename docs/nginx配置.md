# nginx配置

## 开启gzip压缩

```
gzip on;
gzip_min_length 10k;
gzip_buffers 4 16k;
gzip_comp_level 2;
gzip_types application/x-javascript text/javascript application/javascript text/plain text/css application/json application/xml image/jpeg image/gif image/png;
gzip_vary off;
gzip_disable "MSIE [1-6]\.";
```