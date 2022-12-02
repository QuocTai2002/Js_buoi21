// Object staff
function Staff (id,fullName,email,password,dayWork,wage,position,timeWork){
    this.staffID = id;
    this.fullName = fullName;
    this.email = email;
    this.password = password;
    this.dayWork = dayWork;
    this.wage = wage;
    this.position = position;
    this.timeWork = timeWork;
    // phương thức tính tổng lương
    this.totalWage = function () {
        if (this.position == "Sếp"){
            return(this.wage*3);
        }
        else if (this.position == "Trưởng phòng"){
            return(this.wage*2);
        }
        else {
            return(this.wage);
        }
    }
    // phương thức xếp loại nhân viên
    this.classify = function () {
        if (this.position == "Nhân viên" && this.timeWork >= 192) {
            return("Xuất sắc");
        }
        else if (this.position == "Nhân viên" && this.timeWork >= 176){
            return("Giỏi");
        }
        else if (this.position == "Nhân viên" && this.timeWork >= 160){
            return("Khá");
        }
        else if (this.position == "Nhân viên"){
            return("Trung bình")
        }
        else{
            return "";
        }
    }
}

var StaffList = []; //danh sách nhân viên
// thêm nhân viên
function CreateStaff (){
   if(!validateForm ()) return ;
    var id = document.getElementById("tknv").value;
    var fullName = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var dayWork = document.getElementById("datepicker").value;
    var wage = +document.getElementById("luongCB").value;
    var position = document.getElementById("chucvu").value;
    var timeWork = +document.getElementById("gioLam").value;
    //kiểm tra form trước khi tạo 
    
    // kiểm tra xem tài khoản có bị trùng hay không
    for (i=0; i<StaffList.length;i++){
        if (StaffList[i].staffID == id){
            alert("Tài khoản bị Trùng")  
            return ;
        }
    }
    var staff = new Staff (
        id,
        fullName,
        email,
        password,
        dayWork,
        wage,
        position,
        timeWork
    )
    
    StaffList.push(staff);
    renderStaff (); //hiển thị danh sách sinh viên
    saveLocal(); //lưu danh sách nhân viên vào local
    document.getElementById("tknv").value = '';
    document.getElementById("name").value = '';
    document.getElementById("email").value = '';
    document.getElementById("password").value ='';
    document.getElementById("datepicker").value = '';
    document.getElementById("luongCB").value = '';
    document.getElementById("chucvu").value = 'Chọn chức vụ';
    document.getElementById("gioLam").value = '';
}
// hiển thị danh sách nhân viên
function renderStaff (data){
    var data = data || StaffList;
    var html = "";
    for(i = 0; i < data.length;i++){
        html +=  `<tr>
                    <td>${data[i].staffID}</td>
                    <td>${data[i].fullName}</td>
                    <td>${data[i].email}</td>
                    <td>${data[i].dayWork}</td>
                    <td>${data[i].position}</td>
                    <td>${data[i].totalWage()}</td>
                    <td>${data[i].classify()}</td>
                    <td class = "btn_edit">
                    <i class="fa fa-trash-alt"
                    onclick = "deleteStaff ('${data[i].staffID}')"
                    ></i>
                    <i class="fa fa-edit"
                    onclick ="createButtonUpdateStaff ('${data[i].staffID}')"
                    id="update"
                    data-toggle="modal"
					data-target="#myModal"
                    ></i>
                    </td>
                 </tr> `
    }
    document.getElementById("tableDanhSach").innerHTML = html
}
// lưu trữ vào local
function saveLocal (){
    var staffListJason = JSON.stringify(StaffList);
    localStorage.setItem("SL", staffListJason)
}
// đưa dữ liệu dưới local hiển thị
function getLocal (){
    var staffListJason = localStorage.getItem("SL");
    if (!staffListJason) return;
    // chuyển từ json sang object
    var staffListLocal = JSON.parse(staffListJason);
    return staffListLocal;
} 
// map dữ liệu 
function mapStaffList (local){
    var result = []
    for(i = 0; i < local.length; i++){
        var oldStaff = local[i];
        var newStaff = new Staff (
            oldStaff.staffID,
            oldStaff.fullName,
            oldStaff.email,
            oldStaff.password,
            oldStaff.dayWork,
            oldStaff.wage,
            oldStaff.position,
            oldStaff.timeWork
        )
            result.push(newStaff)
    }
    return (result);
}
// xóa danh sách
function deleteStaff (id){
    var index = findById(id);
    if (index === -1) return alert("Tài Khoản không tồn tại");
    StaffList.splice(index,1);
    renderStaff();
    saveLocal();
}
//tìm danh sách id
function findById (id){
    for(i = 0; i < StaffList.length; i++){
        if(StaffList[i].staffID == id)
        return i ;
    }
    return -1;
}
// thêm button tạo nhân viên
function createButtonAddStaff (){
    document.getElementById("btnThemNV").innerHTML = "Thêm người dùng";
    document.getElementById("btnThemNV").classList.add("btn_staff");
    document.getElementById("btnCapNhat").innerHTML = "";
    document.getElementById("btnCapNhat").classList.remove("btn_staff");
    document.getElementById("tknv").value = '';
    document.getElementById("name").value = '';
    document.getElementById("email").value = '';
    document.getElementById("password").value ='';
    document.getElementById("datepicker").value = '';
    document.getElementById("luongCB").value = '';
    document.getElementById("chucvu").value = 'Chọn chức vụ';
    document.getElementById("gioLam").value = '';
    document.getElementById("tbTKNV").innerHTML = "";
    document.getElementById("tbTen").innerHTML = "";
    document.getElementById("tbEmail").innerHTML = "";
    document.getElementById("tbMatKhau").innerHTML = "";
    document.getElementById("tbNgay").innerHTML = "";
    document.getElementById("tbLuongCB").innerHTML = "";
    document.getElementById("tbChucVu").innerHTML = "";
    document.getElementById("tbGiolam").innerHTML = "";
    document.getElementById("tknv").disabled = false;
}
// thêm button cập nhập nhân viên
 function createButtonUpdateStaff (id){
    var index = findById (id)
    if (index === -1) return alert("Tài Khoản không tồn tại");
    document.getElementById("btnThemNV").innerHTML = "";
    document.getElementById("btnThemNV").classList.remove("btn_staff");
    document.getElementById("btnCapNhat").innerHTML = "Cập nhập";
    document.getElementById("btnCapNhat").classList.add("btn_staff"); 
    document.getElementById("tknv").value = StaffList[index].staffID;
    document.getElementById("name").value = StaffList[index].fullName;
    document.getElementById("email").value = StaffList[index].email;
    document.getElementById("password").value = StaffList[index].password;
    document.getElementById("datepicker").value = StaffList[index].dayWork;
    document.getElementById("luongCB").value = StaffList[index].wage ;
    document.getElementById("chucvu").value = StaffList[index].position;
    document.getElementById("gioLam").value = StaffList[index].timeWork;
    document.getElementById("tbTKNV").innerHTML = "";
    document.getElementById("tbTen").innerHTML = "";
    document.getElementById("tbEmail").innerHTML = "";
    document.getElementById("tbMatKhau").innerHTML = "";
    document.getElementById("tbNgay").innerHTML = "";
    document.getElementById("tbLuongCB").innerHTML = "";
    document.getElementById("tbChucVu").innerHTML = "";
    document.getElementById("tbGiolam").innerHTML = "";
    //chặn sữa tài khoản
    document.getElementById("tknv").disabled = true;
    }
// cập nhập nhân viên 
function updateStaff (){
    var id = document.getElementById("tknv").value;
    var fullName = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var dayWork = document.getElementById("datepicker").value;
    var wage = +document.getElementById("luongCB").value;
    var position = document.getElementById("chucvu").value;
    var timeWork = +document.getElementById("gioLam").value;
    if(!validateForm ()) return ;
    var index = findById(id)
    StaffList[index].fullName = fullName
    StaffList[index].email = email
    StaffList[index].password = password
    StaffList[index].dayWork= dayWork
    StaffList[index].wage = wage
    StaffList[index].position = position
    StaffList[index].timeWork = timeWork
    saveLocal();
    renderStaff();
}
//tìm loại nhân viên 
function searchStaff (){
    var keyWord = document.getElementById("searchName").value.toLowerCase().trim();
    var result = [];
    for (i = 0; i < StaffList.length; i++){
        var Staff = StaffList[i].classify().toLowerCase();
        if (Staff.includes(keyWord)){
            result.push(StaffList[i]);
        }
    }
    renderStaff(result);
}
 
window.onload = function (){
    var staffListFromLocal = getLocal();
    StaffList = mapStaffList (staffListFromLocal);
    renderStaff();  
}
/**********VALIDATION************
 */
function required (val, config){
    if(val.length > 0 ){
    document.getElementById(config.errorId).innerHTML = "";
    return true;
    }
    document.getElementById(config.errorId).innerHTML = "* vui lòng nhập giá trị";
    return false;
}
//check giá trị form
function validateForm (){
    var id = document.getElementById("tknv").value;
    var fullName = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var pw = document.getElementById("password").value;
    var dayWork = document.getElementById("datepicker").value;
    var wage = document.getElementById("luongCB").value;
    var position = document.getElementById("chucvu").value;
    var timeWork = document.getElementById("gioLam").value;
    //*************GIÁ TRỊ REGEXP**************************
    var checkValId = /^[qwertyuioplkjhgfdsazxcvbnm0123456789QƯERTYUIOPLKJHGFDSAZXCVBNM]+$/g; 
    var checkName = /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/g;
    var checkValEmail = /^^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    var checkpw = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,10}$/g;
    var checkdate = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/g;
    //****************CHECK************************** */
    //KIỂM TRA ID
    var idVal =
    required (id,{errorId: "tbTKNV"}) && 
    limitLeght (id, {errorId: "tbTKNV",min: 4 ,max: 6}) &&
    checkId (id, {errorId: "tbTKNV",regexp: checkValId});
    //KIỂM TRA TÊN
    var nameVal =
    required (fullName,{errorId: "tbTen"}) && 
    checkFullName (fullName,{errorId: "tbTen", regexp: checkName});
    //KIỂM TRA EMAIL
    var emailVal =
    required (email,{errorId: "tbEmail"}) && 
    checkEmail(email,{errorId: "tbEmail", regexp: checkValEmail});
    //KIỂM TRA PASS
    var passVal =
    required (pw,{errorId: "tbMatKhau"})&& 
    checkPassword(pw,{errorId: "tbMatKhau", regexp: checkpw});
    //KIỂM TRA NGÀY LÀM
    var dayVal =
    required (dayWork,{errorId: "tbNgay"}) &&
    checkDayWork (dayWork,{errorId:"tbNgay",regexp: checkdate});
    //KIÊM TRA LƯƠNG
    var wageVal =
    required (wage,{errorId: "tbLuongCB"}) && 
    limitWage (wage, {errorId: "tbLuongCB", min:1000000 ,max:20000000});
    // KIỂM TRA CHỨC VỤ
    var positionVal =
    checkPosition (position,{errorId: "tbChucVu"});
    // KIỂM TRA GIỜ LÀM
    var timeVal =
    required (timeWork,{errorId: "tbGiolam"}) && 
    limitTimeWork(timeWork,{errorId: "tbGiolam", min:80,max:200});
    /******************TRẢ VỀ GIÁ TRỊ CUỐI CÙNG************** */
    var isFormVali = idVal && nameVal && emailVal && passVal && dayVal && wageVal && positionVal && timeVal;
     return isFormVali;
    
}
///max-leght min-leght
function limitLeght(val, config){
    if (val.length < config.min || val.length > config.max ){
        document.getElementById(config.errorId).innerHTML = `* Độ dài phải từ ${config.min} đến ${config.max} kí tự`;
        return false;
    }
    document.getElementById(config.errorId).innerHTML = "";
    return true; 
}
// check id
function checkId (val, config){
 if(config.regexp.test(val)){
    document.getElementById(config.errorId).innerHTML = "";
    return true;
 }
 document.getElementById(config.errorId).innerHTML = "*không được có kí tự đặt biệt hoặc khoản cách";
 return false;
}
//check tên
function checkFullName (val, config){
    if(config.regexp.test(val)){
        document.getElementById(config.errorId).innerHTML = "";
        return true;
     }
     document.getElementById(config.errorId).innerHTML = "*Tên không Hợp lệ";
     return false;
}
//check gmail
function checkEmail (val, config){
    if(config.regexp.test(val)){
        document.getElementById(config.errorId).innerHTML = "";
        return true;
     }
     document.getElementById(config.errorId).innerHTML = "*Email không hợp lệ";
     return false;
}
//check password
function checkPassword (val, config){
    if(config.regexp.test(val)){
        document.getElementById(config.errorId).innerHTML = "";
        return true;
     }
     document.getElementById(config.errorId).innerHTML = "* mật khẩu 6-10 ký tự , ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt";
     return false;
}
//check lương
function limitWage(val, config){
    if (val < config.min || val > config.max ){
        document.getElementById(config.errorId).innerHTML = `* Lương không hợp lệ`;
        return false;
    }
    document.getElementById(config.errorId).innerHTML = "";
    return true; 
}
// kiểm tra chức vụ không được bỏ trống 
function checkPosition (val, config){
    if (val == "Chọn chức vụ"){
        document.getElementById(config.errorId).innerHTML = `* Vui lòng chọn chức vụ`;
        return false;
    }
    document.getElementById(config.errorId).innerHTML = "";
    return true; 
}

//kiểm tra giờ làm 
function limitTimeWork(val, config){
    if (val < config.min || val > config.max ){
        document.getElementById(config.errorId).innerHTML = `* số giờ làm phải 80h-200h `;
        return false;
    }
    document.getElementById(config.errorId).innerHTML = "";
    return true; 
}
//kiểm tra định dạng ngày làm
function checkDayWork (val, config){
    if(config.regexp.test(val)){
        document.getElementById(config.errorId).innerHTML = "";
        return true;
     }
     document.getElementById(config.errorId).innerHTML = "*Định dạng phải mm/dd/yyyy hoặc ngày không hợp lệ";
     return false;
}