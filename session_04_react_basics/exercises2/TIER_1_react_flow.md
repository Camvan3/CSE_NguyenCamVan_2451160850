### Bai 1.1
1. Tại sao component LifecycleDemo chỉ render 1 lần duy nhất?
Lý do: Vì bên trong component này chỉ có các dòng chữ tĩnh, không hề có State (useState) hay bất kỳ yếu tố dữ liệu nào thay đổi. Sau khi được React gọi lần đầu tiên để dựng giao diện lên màn hình (gọi là Initial Render hoặc Mount), không có bất cứ lý do nào kích hoạt hệ thống phải tính toán lại nó, nên nó đứng yên mãi mãi.

2. Khi nào nó sẽ render lại (Re-render)?
Một component trong React sẽ render lại khi thuộc một trong các trường hợp sau:

State của chính nó thay đổi: Khi ta dùng hàm setSomething của useState.

Props truyền vào nó thay đổi: Khi component cha truyền cho nó một dữ liệu mới từ bên ngoài vào.

Component cha của nó bị re-render: Khi nhà cha sửa sang lại, các component con bên trong mặc định cũng sẽ bị gọi lại để quét lại cấu trúc.

(Lưu ý nhỏ: Ở chế độ chạy thử nghiệm Local Development, đôi khi bạn sẽ thấy log chạy 2 lần liên tiếp. Đó là do tính năng Strict Mode của React cố tình chạy hai lần để giúp lập trình viên kiểm tra xem code có bị lỗi bộ nhớ hay không. Khi đóng gói chạy thật, nó chỉ chạy 1 lần).
### Bai 1.2
1. Chạy BadCounter ->nhấn nút -> thấy gì?Giao diện (UI): Con số ở dòng Bộ đếm: 0 giữ nguyên là 0, hoàn toàn không thay đổi dù bạn có bấm mỏi tay.Hộp thoại Console (F12): Số lượng log tăng dần liên tục: Count: 1, Count: 2, Count: 3...Giải thích: Biến let count thực sự có tăng giá trị trong bộ nhớ, nhưng React không hề biết điều đó để đi vẽ lại giao diện cho bạn. Ngoài ra, khi có một yếu tố nào đó vô tình làm component này re-render, biến let count sẽ bị reset ngay lập tức về 0 (vì hàm bị chạy lại từ đầu)
2. 2. Chạy GoodCounter -> nhấn nút -> thấy gì?Giao diện (UI): Con số tăng tiến ngay lập tức theo mỗi lần click: 1, 2, 3...Giải thích: Hàm setCount đóng vai trò như một hồi chuông báo thức. Khi bạn gọi setCount(count + 1), nó không chỉ tăng giá trị mà còn đập tay báo cho React biết: "Này, dữ liệu đổi rồi, đi vẽ lại màn hình mới cho người dùng đi!".
