# Calculator_CS526
-	Bước 1: Mở docker và đăng nhập
-	Bước 2: Vào File Explorer và tìm một nơi tạo thư mục mới
-	Bước 3: Lên link https://github.com/longtran071/Calculator_CS526 và tải code về sau đó giải nén vào thư mục mới tạo
-	Bước 4: Vào cmd và nhập vào đoạn code sau: docker run -u node -it --rm --name mayao -p 19000-19010:19000-19010 -v (dd*):/current -w /current node:18-slim bash
o	Chú ý: (dd*) là đường dẫn đến thư mục vừa tạo: 
	Vd: E:\Calculator_project
-	Bước 5: Sau khi hiện lên ![image](https://user-images.githubusercontent.com/92980668/196848081-53fe130c-58b8-4827-815d-4e171b5b107d.png)
   (ký tự sau @ có thể khác)
-	Bước 6: Nhập cd Calculator
-	Bước 7: Nhập npm start
-	Bước 8: Tải expo go trên điện thoại
-	Bước 9: Tìm IP máy tính bằng cách mở cmd mới và nhập ipconfig
o	IP sẽ nằm trong IPv4 Address của Wireless Lan adapter Wi-Fi:
 ![image](https://user-images.githubusercontent.com/92980668/196848221-131b7554-a9f4-4d75-a3f0-6b69526966b3.png)

-	Bước 10: Mở expo app trên điện thoại và bấm vào Enter URL manually và nhập exp://IP:19000
o	IP: IP máy tính vừa tìm được ở bước 9
-	Bước 11: Chờ điện thoại load xong
-	Bước 12: Sử dụng
