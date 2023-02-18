FROM node:19

USER website

RUN mkdir -p /home/website

WORKDIR /home/website

RUN npm install -g pnpm

RUN pnpm install

RUN pnpm build

FROM nginx:1.21-alpine

COPY --from=builder /home/website/build /var/www/pungrumpy/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN touch /var/run/nginx.pid

RUN chown -R nginx:nginx /var/run/nginx.pid /usr/share/nginx/html /var/cache/nginx /var/log/nginx /etc/nginx/conf.d

USER nginx

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]