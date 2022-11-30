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
    var id = document.getElementById("tknv").value;
    var fullName = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var dayWork = document.getElementById("datepicker").value;
    var wage = +document.getElementById("luongCB").value;
    var position = document.getElementById("chucvu").value;
    var timeWork = +document.getElementById("gioLam").value;
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
function renderStaff (){
    var html = "";
    for(i = 0; i < StaffList.length;i++){
        html +=  `<tr>
                    <td>${StaffList[i].staffID}</td>
                    <td>${StaffList[i].fullName}</td>
                    <td>${StaffList[i].email}</td>
                    <td>${StaffList[i].dayWork}</td>
                    <td>${StaffList[i].position}</td>
                    <td>${StaffList[i].totalWage()}</td>
                    <td>${StaffList[i].classify()}</td>
                    <td class = "btn_edit">
                    <i class="fa fa-trash-alt"
                    onclick = "deleteStaff ('${StaffList[i].staffID}')"
                    ></i>
                    <i class="fa fa-edit"
                    onclick ="createButtonUpdateStaff ('${StaffList[i].staffID}')"
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
window.onload = function (){
    var staffListFromLocal = getLocal();
    StaffList = mapStaffList (staffListFromLocal);
    renderStaff();
}

