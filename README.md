# Blockless Bless Network Bot 
# Vietnamese below
## Description
This script automates network or node operations for Blockless Bless Network Bot.

## Update

- if you already generated pubkey using sc before just retire it
- must generate pubkey manually at extension bless network
- hardwareId is can generate from sc, or just paste from extension bless network
- input manually `id.txt` with your pubkey and hardwareid

## Features
- **Automated node interaction**
- **Multi NodeID**
- **Proxy support**
- **Multi Account**

## Prerequisites
- [Node.js](https://nodejs.org/)

## Installation

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/hthoairdrop/bless_multi_account_hthojun.git
   ```
2. Navigate to the project directory:
	```bash
	cd bless_multi_account_hthojun
	```
3. Install the necessary dependencies:
	```bash
	npm install
	```

## Usage
1. Register to blockless bless network account first, if you dont have you can register [https://bless.network/](https://bless.network/dashboard?ref=WMWX3M).
2. Set and Modify `user.txt`. Below how to setup this file, put your B7S_AUTH_TOKEN in the text file, example below:
	```
	eyJhbGcixxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
	```
	To get your token, follow this step:
	- Login to your blockless account in [https://bless.network/](https://bless.network/dashboard?ref=WMWX3M), 
	- Go to inspect element, press F12 or right-click then pick inspect element in your browser
	- Go to application tab - look for Local Storage in storage list -> click `https://bless.network` and you will see your B7S_AUTH_TOKEN.
	- or you can go Console tab and paste this 
	```bash
	localStorage.getItem('B7S_AUTH_TOKEN')
	```
3. Create hardware id
- you can automatically create it with this command
    ```
    node setup.js
    ```
	put in `id.txt`. in the text file with this format `nodeid(pubkey):hardwareid`, example below:
	```
 	12D3Koxxxxxxxxxxxx3ws:e938610xxxxxxxxxxxx
	12D3Koxxxxxxxxxxxx58o:221610xxxxxxxxxxxxx
 	```

    if you have 2 accounts and 10 id, you must copy this token x5 times
    example
    ```
    file user.txt
    token1
    token1
    token1
    token1
    token1
    token2
    token2
    token2
    token2
    token2

    file id
    id1a
    id1b
    id1c
    id1d
    id1e
    id2a
    id2b
    id2c
    id2d
    id2e
    ```
    
4. put your pubkey you get from extension
	```bash
	nano id.txt
	```

5. If you want to use `proxy`, edit `proxy.txt` and add your proxy in there. Make sure total proxy is same with your total `nodeid(pubkey):hardwareid` that you put in `id.txt` 
6. Run the script:
	```bash
	node main.js
	```
**NOTE: The total time is refreshed every 10minute connection, One account only can have 5 nodeid max and can't be deleted, I recomended to save your Nodeid(pubkey) and hardwareid of your account**

**NOTE 2: this repo copy left from: https://github.com/Zlkcyber/bless-bot.git**


# Blockless Bless Network Bot
# Tiếng Việt bên dưới
## Mô tả
Script này tự động hóa các hoạt động mạng hoặc nút cho Blockless Bless Network Bot.

## Cập nhật

- nếu bạn đã tạo pubkey bằng sc trước khi chỉ cần hủy bỏ
- phải tạo pubkey thủ công tại phần mở rộng bless network
- hardwareId có thể tạo từ sc hoặc chỉ cần dán từ phần mở rộng bless network
- nhập thủ công `id.txt` với pubkey và hardwareid của bạn

## Tính năng
- **Tương tác nút tự động**
- **Nhiều nodeID**
- **Hỗ trợ proxy**
- **Nhiều tài khoản**

## Điều kiện tiên quyết
- [Node.js](https://nodejs.org/)

## Cài đặt

1. Sao chép kho lưu trữ vào máy cục bộ của bạn:
```bash
git clone https://github.com/hthoairdrop/bless_multi_account_hthojun.git
```
2. Điều hướng đến thư mục dự án:
```bash
cd bless_multi_account_hthojun
```
3. Cài đặt các phụ thuộc cần thiết:
```bash
npm install
```

## Cách sử dụng
1. Đăng ký tài khoản bless network không chặn trước, nếu bạn không bạn có thể đăng ký [https://bless.network/](https://bless.network/dashboard?ref=WMWX3M).
2. Thiết lập và Sửa đổi `user.txt`. Dưới đây là cách thiết lập tệp này, hãy đặt B7S_AUTH_TOKEN của bạn vào tệp văn bản, ví dụ bên dưới:
```
eyJhbGcixxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
Để lấy mã thông báo của bạn, hãy làm theo bước này:
- Đăng nhập vào tài khoản không chặn của bạn trong [https://bless.network/](https://bless.network/dashboard?ref=WMWX3M),
- Vào kiểm tra phần tử, nhấn F12 hoặc nhấp chuột phải rồi chọn kiểm tra phần tử trong trình duyệt của bạn
- Vào tab ứng dụng - tìm Lưu trữ cục bộ trong danh sách lưu trữ -> nhấp vào `https://bless.network` và bạn sẽ thấy B7S_AUTH_TOKEN của mình.
- hoặc bạn có thể vào tab Console và dán lệnh này
```bash
localStorage.getItem('B7S_AUTH_TOKEN')
```
3. Tạo id phần cứng
- bạn có thể tự động tạo bằng lệnh này
```
node setup.js
```
đặt vào `id.txt`. trong tệp văn bản có định dạng này `nodeid(pubkey):hardwareid`, ví dụ bên dưới:
```
12D3Koxxxxxxxxxxxx3ws:e938610xxxxxxxxxxxx
12D3Koxxxxxxxxxxxx58o:221610xxxxxxxxxxxxxxx
```

nếu bạn có 2 tài khoản và 10 id, bạn phải sao chép token này x5 lần
ví dụ
    ```
    tệp user.txt
    token1
    token1
    token1
    token1
    token1
    token2
    token2
    token2
    token2
    token2
    token2

    tệp id
    id1a
    id1b
    id1c
    id1d
    id1e
    id2a
    id2b
    id2c
    id2d
    id2e
    ```

4. đặt public id bạn nhận được từ tiện ích mở rộng
```bash
nano id.txt
```

5. Nếu bạn muốn sử dụng `proxy`, chỉnh sửa `proxy.txt` và thêm proxy của bạn vào đó. Đảm bảo tổng proxy giống với tổng `nodeid(pubkey):hardwareid` mà bạn đã đặt trong `id.txt`
6. Chạy tập lệnh:
```bash
node main.js
```
**LƯU Ý: Tổng thời gian được làm mới sau mỗi 10 phút kết nối, Một tài khoản chỉ có thể có tối đa 5 nodeid và không thể xóa, tôi khuyên bạn nên lưu Nodeid(pubkey) và hardwareid của tài khoản của bạn**

**LƯU Ý 2: Repo này được copy và sửa trên nguồn source của https://github.com/Zlkcyber/bless-bot.git**