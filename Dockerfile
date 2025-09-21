#Folow sẽ là đầu tiên phải cài nodejs ->
#Tiếp theo tạo ra 1 folder để làm việc là app nếu không có folder này thì các câu lệnh dưới sẽ phải ghi rõ ./app ->
#Tiếp theo là copy package và yarn lock vào folder app ( nếu ko có WORKDIR thì các câu lệnh dưới sẽ phải ghi rõ ./app )
#Tiếp theo là RUN yarn install để cài đặt các dependencies
#Tiếp theo là copy toàn bộ nội dung của folder chứa docke file này (tức là code) vào folder app
#Tiếp theo là EXPOSE 3039 để mở port 3039 -> tức khi build image thì port 3039 sẽ được mở (trong docker) sẽ dùng lệnh để mapping port bên ngoài
#Tiếp theo là CMD ["yarn", "dev"] để chạy ứng dụng => yarn dev

FROM node:20.19.2-alpine

WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml ./

#=> lệnh này để bật corepacker yarn 3.6.1 vào ứng dụng để fix lỗi
#This project's package.json defines "packageManager": "yarn@3.6.1". However the current global version of Yarn is 1.22.22.
RUN corepack enable && corepack prepare yarn@3.6.1 --activate

RUN yarn install

# copy the rest of the application
# dấu . thứ nhất là coppy toàn bộ nội dung của folder chứa docker file này.
# thứ 2 là của workdir ở đây mình đã định nghĩa là app
# => nghĩa là coppy toàn bộ nội dung của folder chứa docker file này vào folder app
COPY . .

#=> lệnh này để build ứng dụng. nếu lỗi thì báo lỗi và dừng lại
RUN yarn build

#=> lệnh này để mở port 3039 để chạy ứng dụng ( chỉ ở trong docker)
#=> Nếu muốn chạy ứng dụng bên ngoài thì ta phải mapping port bên ngoài và port trong docker
EXPOSE 3039

# => lệnh này để chạy ứng dụng với port 3039 build với vite
# => detail: yarn dev => sửa port trong vite.config.ts thành 3039
CMD ["yarn", "dev"]


# Follow khi viết xong docker file thì ta chạy lệnh sau để build image
# `build:` docker build -t shopee-clone .
# => detail: docker build -t <image_name> . Với <image_name> là tên của image mà mình đặt ở đây là shopee-clone
# `mapping port:` docker run -p 3039:3039 shopee-clone
# => detail: docker run -p <port_bên ngoài>:<port_trong docker> <image_name>

# Sau khi hoàn thành việc build docker và mapping port để chạy
# Bước tiếp theo sẽ là đẩy docker images lên để mọi người có thể pull về sài

# Folow: tạo tagname và push image tagname lên dockerhub
#<tagname>: mình đặt là latest nhưng mình có thể đặt là 1.0.0, 1.0.1, ... tự đặt theo ý muốn
# `tạo tagname:` docker tag shopee-clone <username>/<image_name>:<tagname>
# => detail: docker tag <image_name> <username>/<image_name>:<tagname>
# => ví dụ: docker tag shopee-clone hoangquocduy/shopee-clone:latest
# `đẩy tagname lên dockerhub:` docker push <username>/<image_name>:<tagname>
# => detail: docker push <username>/<image_name>:<tagname>
# => ví dụ: docker push hoangquocduy/shopee-clone:1.0.0

# Folow: Pull về và mapping port
#Khi đã đẩy lên xong dockerhub thì ta có thể pull về sài bằng lệnh sau
# `pull:` docker pull <username>/<image_name>:<tagname>
# => detail: docker pull <username>/<image_name>:<tagname>
# => ví dụ: docker pull hoangquocduy/shopee-clone:1.0.0

#Khi đã pull về xong thì ta có thể chạy lệnh sau để chạy container
# `chạy container:` docker run -p <port_bên ngoài>:<port_trong docker> <username>/<image_name>:<tagname>
# => detail: docker run -p <port_bên ngoài>:<port_trong docker> <username>/<image_name>:<tagname>
# => ví dụ: docker run -p 3039:3039 hoangquocduy/shopee-clone:1.0.0
