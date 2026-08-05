/*=========================================================
                ATP FLEET MANAGEMENT
                SCRIPT.JS
                PART 1
        CONSTANTS & DOM ELEMENTS
=========================================================*/


/*=========================================================
                    CONSTANTS
=========================================================*/

const ADMIN_PASSWORD = "1234";


const VEHICLE_TYPES = {

    PRIVATE:"PRIVATE",

    TRUCKS:"TRUCKS",

    EQUIPMENT:"EQUIPMENT",

    SPECIAL:"SPECIAL",

    GENERATORS:"GENERATORS"

};



const STATUS = {

    WORKING:"working",

    STOPPED:"stopped"

};



const DRIVER_STATUS = {

    PRESENT:"present",

    ABSENT:"absent",

    SICK:"sick",

    ANNUAL:"annual"

};



const MAINTENANCE_STATUS = {

    NONE:"none",

    PERIODIC:"periodic",

    EMERGENCY:"emergency"

};

const API_URL =
"https://script.google.com/macros/s/AKfycbxcpsWtq2IB0nXePZFty9_kX53Dq8ABRYb0uQ_hmqA0Y1NKog8vU3a7wXlQcUoC_qjh/exec";
async function loadVehiclesFromServer(){

    try{

        const response =
        await fetch(
            API_URL + "?action=getVehicles"
        );

        const data =
        await response.json();

        vehicles.length = 0;

        data.forEach(vehicle=>{

            vehicles.push(vehicle);

        });

        renderVehicles();

    }

    catch(error){

        console.error(error);

        alert("تعذر الاتصال بقاعدة البيانات");

    }

}

/*=========================================================
                    DOM ELEMENTS
=========================================================*/


const homePage =
document.getElementById("homePage");


const registerPage =
document.getElementById("registerPage");


const viewPage =
document.getElementById("viewPage");



const vehicleType =
document.getElementById("vehicleType");


const vehicleNumber =
document.getElementById("vehicleNumber");


const driverName =
document.getElementById("driverName");


const driverStatus =
document.getElementById("driverStatus");


const vehicleStatus =
document.getElementById("vehicleStatus");


const maintenanceStatus =
document.getElementById("maintenanceStatus");


const vehicleNotes =
document.getElementById("vehicleNotes");



const todayName =
document.getElementById("todayName");


const todayDate =
document.getElementById("todayDate");


const todayTime =
document.getElementById("todayTime");



/*=========================================================
                    END PART 1
=========================================================*/
/*=========================================================
                NAVIGATION MODULE
                PART 2
=========================================================*/


/*=========================================================
                إظهار صفحة تسجيل الحالة
=========================================================*/

function showRegisterPage(){

    hideAllPages();

    registerPage.style.display="block";

}



/*=========================================================
                العودة للرئيسية
=========================================================*/

function goHome(){

    hideAllPages();

    homePage.style.display="block";

    resetForm();

}



/*=========================================================
                إظهار صفحة العرض
=========================================================*/

function showViewPage(){

    hideAllPages();

    viewPage.style.display="block";

    renderVehicles();

}



/*=========================================================
                إخفاء جميع الصفحات
=========================================================*/

function hideAllPages(){

    homePage.style.display="none";

    registerPage.style.display="none";

    viewPage.style.display="none";

}



/*=========================================================
                فتح وإغلاق الأقسام
=========================================================*/

function toggleSection(id){

    const section =
    document.getElementById(id);


    if(!section) return;


    if(section.style.display==="none"
       ||
       section.style.display===""){

        section.style.display="block";

    }

    else{

        section.style.display="none";

    }

}



/*=========================================================
                    END PART 2
=========================================================*/
/*=========================================================
                CLOCK MODULE
                PART 3
=========================================================*/


/*=========================================================
                أسماء الأيام بالعربية
=========================================================*/

const daysArabic = [

    "الأحد",

    "الإثنين",

    "الثلاثاء",

    "الأربعاء",

    "الخميس",

    "الجمعة",

    "السبت"

];



/*=========================================================
                تحديث التاريخ والوقت
=========================================================*/

function updateDateTime(){


    const now =
    new Date();



    if(todayName){

        todayName.textContent =
        daysArabic[now.getDay()];

    }



    if(todayDate){

        todayDate.textContent =
        now.toLocaleDateString(
            "ar-SA",
            {
                year:"numeric",
                month:"long",
                day:"numeric"
            }
        );

    }



    if(todayTime){

        todayTime.textContent =
        now.toLocaleTimeString(
            "ar-SA",
            {
                hour:"2-digit",
                minute:"2-digit",
                second:"2-digit"
            }
        );

    }


}



/*=========================================================
                تشغيل الساعة
=========================================================*/

function startClock(){

    updateDateTime();


    setInterval(

        updateDateTime,

        1000

    );

}



/*=========================================================
                    END PART 3
=========================================================*/
/*=========================================================
                DATA MANAGER MODULE
                PART 4
=========================================================*/


/*=========================================================
                البحث عن مركبة بواسطة ID
=========================================================*/

function getVehicleById(id){

    return vehicles.find(

        vehicle =>
        vehicle.id === Number(id)

    );

}



/*=========================================================
                جلب المركبات حسب النوع
=========================================================*/

function getVehiclesByType(type){

    return vehicles.filter(

        vehicle =>
        vehicle.type === type

    );

}



/*=========================================================
                تحديث بيانات مركبة
=========================================================*/

function updateVehicle(id,data){


    const vehicle =
    getVehicleById(id);



    if(!vehicle){

        return false;

    }



    Object.assign(

        vehicle,

        data

    );



    vehicle.lastUpdate =
    new Date().toISOString();



    return true;

}



/*=========================================================
                إعادة ضبط النموذج
=========================================================*/

function resetForm(){


    if(vehicleType){

        vehicleType.value="";

    }



    if(vehicleNumber){

        vehicleNumber.innerHTML =
        `
        <option value="">
        اختر
        </option>
        `;

    }



    if(driverName){

        driverName.textContent =
        "---";

    }



    if(vehicleStatus){

        vehicleStatus.value =
        STATUS.WORKING;

    }



    if(driverStatus){

        driverStatus.value =
        DRIVER_STATUS.PRESENT;

    }



    if(maintenanceStatus){

        maintenanceStatus.value =
        MAINTENANCE_STATUS.NONE;

    }



    if(vehicleNotes){

        vehicleNotes.value =
        "";

    }


}



/*=========================================================
                اسم النوع بالعربية
=========================================================*/

function getTypeName(type){


    switch(type){


        case VEHICLE_TYPES.PRIVATE:

            return "المركبات الصغيرة";



        case VEHICLE_TYPES.TRUCKS:

            return "رؤوس الشاحنات والقاطرات";



        case VEHICLE_TYPES.EQUIPMENT:

            return "المعدات الكبيرة والصغيرة";



        case VEHICLE_TYPES.SPECIAL:

            return "السيارات المتخصصة";



        case VEHICLE_TYPES.GENERATORS:

            return "المولدات والمضخات";



        default:

            return "";

    }

}



/*=========================================================
                    END PART 4
=========================================================*/
/*=========================================================
            VEHICLE REGISTRATION MODULE
            PART 5
=========================================================*/


/*=========================================================
                تحميل أرقام المركبات
=========================================================*/

function loadVehicleNumbers(){


    if(!vehicleNumber){

        return;

    }



    vehicleNumber.innerHTML =
    `
    <option value="">
    اختر
    </option>
    `;



    if(driverName){

        driverName.textContent =
        "---";

    }



    if(!vehicleType.value){

        return;

    }



    const list =
    getVehiclesByType(
        vehicleType.value
    );



    list.forEach(vehicle=>{


        const option =
        document.createElement(
            "option"
        );



        option.value =
        vehicle.id;



        option.textContent =
        vehicle.number;



        vehicleNumber.appendChild(
            option
        );


    });


}



/*=========================================================
            تحميل بيانات المركبة المختارة
=========================================================*/

function loadVehicleInformation(){


    const vehicle =
    getVehicleById(
        vehicleNumber.value
    );



    if(!vehicle){


        driverName.textContent =
        "---";


        return;

    }



    driverName.textContent =
    vehicle.driver;



    vehicleStatus.value =
    vehicle.status;



    driverStatus.value =
    vehicle.driverStatus;



    maintenanceStatus.value =
    vehicle.maintenance;



    vehicleNotes.value =
    vehicle.notes || "";


}



/*=========================================================
                حفظ حالة المركبة
=========================================================*/

function saveVehicleReport(){


    const vehicle =
    getVehicleById(
        vehicleNumber.value
    );



    if(!vehicle){


        alert(
            "يرجى اختيار المركبة"
        );


        return;

    }



    updateVehicle(

        vehicle.id,

        {


            status:
            vehicleStatus.value,



            driverStatus:
            driverStatus.value,



            maintenance:
            maintenanceStatus.value,



            notes:
            vehicleNotes.value.trim()


        }

    );



    alert(
        "تم حفظ البيانات بنجاح"
    );



    renderVehicles();



    resetForm();


}



/*=========================================================
                ربط الحقول
=========================================================*/


if(vehicleType){


    vehicleType.addEventListener(

        "change",

        loadVehicleNumbers

    );


}



if(vehicleNumber){


    vehicleNumber.addEventListener(

        "change",

        loadVehicleInformation

    );


}



/*=========================================================
                    END PART 5
=========================================================*/
/*=========================================================
                STATISTICS MODULE
                PART 6
=========================================================*/


/*=========================================================
                حساب إحصائيات القسم
=========================================================*/

function getSectionStatistics(type){


    const list =
    getVehiclesByType(type);



    return {


        total:

        list.length,



        working:

        list.filter(

            vehicle =>
            vehicle.status === STATUS.WORKING

        ).length,



        stopped:

        list.filter(

            vehicle =>
            vehicle.status === STATUS.STOPPED

        ).length


    };


}



/*=========================================================
                تحديث بطاقة القسم
=========================================================*/

function updateSectionCard(type,prefix){


    const statistics =
    getSectionStatistics(type);



    const total =
    document.getElementById(
        prefix+"Total"
    );



    const working =
    document.getElementById(
        prefix+"Working"
    );



    const stopped =
    document.getElementById(
        prefix+"Stopped"
    );



    if(total){

        total.textContent =
        statistics.total;

    }



    if(working){

        working.textContent =
        statistics.working;

    }



    if(stopped){

        stopped.textContent =
        statistics.stopped;

    }


}



/*=========================================================
                تحديث جميع الإحصائيات
=========================================================*/

function updateStatistics(){


    const sections = [


        {

            type:
            VEHICLE_TYPES.PRIVATE,

            prefix:
            "private"

        },


        {

            type:
            VEHICLE_TYPES.TRUCKS,

            prefix:
            "trucks"

        },


        {

            type:
            VEHICLE_TYPES.EQUIPMENT,

            prefix:
            "equipment"

        },


        {

            type:
            VEHICLE_TYPES.SPECIAL,

            prefix:
            "special"

        },


        {

            type:
            VEHICLE_TYPES.GENERATORS,

            prefix:
            "generator"

        }


    ];



    sections.forEach(

        section=>{


            updateSectionCard(

                section.type,

                section.prefix

            );


        }

    );


}



/*=========================================================
                    END PART 6
=========================================================*/
/*=========================================================
                RENDER MODULE
                PART 7
=========================================================*/


/*=========================================================
                عرض جميع المركبات
=========================================================*/

function renderVehicles(){


    const sections = [


        {

            type:
            VEHICLE_TYPES.PRIVATE,

            container:
            "privateSection"

        },


        {

            type:
            VEHICLE_TYPES.TRUCKS,

            container:
            "trucksSection"

        },


        {

            type:
            VEHICLE_TYPES.EQUIPMENT,

            container:
            "equipmentSection"

        },


        {

            type:
            VEHICLE_TYPES.SPECIAL,

            container:
            "specialSection"

        },


        {

            type:
            VEHICLE_TYPES.GENERATORS,

            container:
            "generatorSection"

        }


    ];



    sections.forEach(

        section=>{


            renderSection(

                section.type,

                section.container

            );


        }

    );



    updateStatistics();


}



/*=========================================================
                عرض قسم واحد
=========================================================*/

function renderSection(type,containerId){


    const container =
    document.getElementById(
        containerId
    );



    if(!container){

        return;

    }



    container.innerHTML =
    "";



    const list =
    getVehiclesByType(type);



    list.forEach(

        vehicle=>{


            container.appendChild(

                createVehicleRow(vehicle)

            );


        }

    );


}



/*=========================================================
                إنشاء صف المركبة
=========================================================*/

function createVehicleRow(vehicle){


    const row =
    document.createElement(
        "div"
    );



    row.className =
    "vehicle-card";



    row.innerHTML = `


    <div class="vehicle-status 
    ${getVehicleStatusClass(vehicle.status)}">

        ${getVehicleStatusText(vehicle.status)}

    </div>



    <div class="vehicle-number">

        ${vehicle.number}

    </div>



    <div class="vehicle-driver">

        ${vehicle.driver}

    </div>



    <div class="vehicle-driver-status
    ${getDriverStatusClass(vehicle.driverStatus)}">

        ${getDriverStatusText(vehicle.driverStatus)}

    </div>



    <div class="vehicle-maintenance
    ${getMaintenanceClass(vehicle.maintenance)}">

        ${getMaintenanceText(vehicle.maintenance)}

    </div>



    <div class="vehicle-update">

        ${formatLastUpdate(vehicle.lastUpdate)}

    </div>


    `;



    return row;


}



/*=========================================================
                    END PART 7
=========================================================*/
/*=========================================================
                TEXT HELPERS MODULE
                PART 8
=========================================================*/


/*=========================================================
                نص حالة المركبة
=========================================================*/

function getVehicleStatusText(status){


    if(status === STATUS.WORKING){

        return "تعمل";

    }


    if(status === STATUS.STOPPED){

        return "لا تعمل";

    }


    return "-";


}



/*=========================================================
                نص حالة السائق
=========================================================*/

function getDriverStatusText(status){


    switch(status){


        case DRIVER_STATUS.PRESENT:

            return "حاضر";



        case DRIVER_STATUS.ABSENT:

            return "غائب";



        case DRIVER_STATUS.SICK:

            return "إجازة مرضية";



        case DRIVER_STATUS.ANNUAL:

            return "إجازة سنوية";



        default:

            return "-";


    }


}



/*=========================================================
                نص حالة الصيانة
=========================================================*/

function getMaintenanceText(status){


    switch(status){


        case MAINTENANCE_STATUS.NONE:

            return "لا يوجد";



        case MAINTENANCE_STATUS.PERIODIC:

            return "صيانة دورية";



        case MAINTENANCE_STATUS.EMERGENCY:

            return "صيانة طارئة";



        default:

            return "-";


    }


}



/*=========================================================
                    END PART 8
=========================================================*/
/*=========================================================
                CSS CLASSES HELPERS MODULE
                PART 9
=========================================================*/


/*=========================================================
                كلاس حالة المركبة
=========================================================*/

function getVehicleStatusClass(status){


    switch(status){


        case STATUS.WORKING:

            return "status-working";



        case STATUS.STOPPED:

            return "status-stopped";



        default:

            return "";


    }


}



/*=========================================================
                كلاس حالة السائق
=========================================================*/

function getDriverStatusClass(status){


    switch(status){


        case DRIVER_STATUS.PRESENT:

            return "driver-present";



        case DRIVER_STATUS.ABSENT:

            return "driver-absent";



        case DRIVER_STATUS.SICK:

            return "driver-sick";



        case DRIVER_STATUS.ANNUAL:

            return "driver-annual";



        default:

            return "";


    }


}



/*=========================================================
                كلاس حالة الصيانة
=========================================================*/

function getMaintenanceClass(status){


    switch(status){


        case MAINTENANCE_STATUS.NONE:

            return "maintenance-none";



        case MAINTENANCE_STATUS.PERIODIC:

            return "maintenance-periodic";



        case MAINTENANCE_STATUS.EMERGENCY:

            return "maintenance-emergency";



        default:

            return "";


    }


}



/*=========================================================
                    END PART 9
=========================================================*/
/*=========================================================
                LAST UPDATE MODULE
                PART 10
=========================================================*/


/*=========================================================
                تنسيق آخر تحديث
=========================================================*/

function formatLastUpdate(value){


    if(!value){

        return "-";

    }



    const updateDate =
    new Date(value);



    if(isNaN(updateDate)){

        return "-";

    }



    const now =
    new Date();



    const difference =
    now - updateDate;



    const seconds =
    Math.floor(
        difference / 1000
    );



    const minutes =
    Math.floor(
        seconds / 60
    );



    const hours =
    Math.floor(
        minutes / 60
    );



    const days =
    Math.floor(
        hours / 24
    );



    if(days > 0){

        return days + " D";

    }



    if(hours > 0){

        return hours + " H";

    }



    if(minutes > 0){

        return minutes + " M";

    }



    return seconds + " S";


}



/*=========================================================
                تحديث أوقات العرض
=========================================================*/

function refreshUpdateTimes(){


    const elements =
    document.querySelectorAll(
        ".vehicle-update"
    );



    elements.forEach(

        element=>{


            const vehicle =
            element.closest(
                ".vehicle-card"
            );



            if(!vehicle){

                return;

            }


        }

    );


}



/*=========================================================
                    END PART 10
=========================================================*/
/*=========================================================
                PASSWORD MODULE
                PART 11
=========================================================*/


/*=========================================================
                التحقق من كلمة المرور
=========================================================*/

function checkPassword(){


    const password =
    prompt(
        "أدخل الرقم السري لعرض حالة المركبات"
    );



    if(password === ADMIN_PASSWORD){


        showViewPage();


    }

    else{


        if(password !== null){

            alert(
                "الرقم السري غير صحيح"
            );

        }


    }


}



/*=========================================================
                تغيير الرقم السري لاحقاً
=========================================================*/

function changeAdminPassword(){


    const oldPassword =
    prompt(
        "أدخل الرقم السري الحالي"
    );



    if(oldPassword !== ADMIN_PASSWORD){


        alert(
            "الرقم السري الحالي غير صحيح"
        );


        return;

    }



    const newPassword =
    prompt(
        "أدخل الرقم السري الجديد"
    );



    if(newPassword){


        alert(
            "تم تغيير الرقم السري. يجب تحديث القيمة داخل الملف"
        );


    }


}



/*=========================================================
                    END PART 11
=========================================================*/
/*=========================================================
                WHATSAPP MODULE
                PART 12
=========================================================*/


/*=========================================================
                حفظ وإرسال التقرير
=========================================================*/

function saveAndSendReport(){


    const vehicle =
    getVehicleById(
        vehicleNumber.value
    );



    if(!vehicle){


        alert(
            "يرجى اختيار المركبة"
        );


        return;

    }



    updateVehicle(

        vehicle.id,

        {


            status:
            vehicleStatus.value,



            driverStatus:
            driverStatus.value,



            maintenance:
            maintenanceStatus.value,



            notes:
            vehicleNotes.value.trim()


        }

    );



    const message =

`ATP Fleet Management

المركبة: ${vehicle.number}

السائق: ${vehicle.driver}

حالة المركبة: ${getVehicleStatusText(vehicleStatus.value)}

حالة السائق: ${getDriverStatusText(driverStatus.value)}

الصيانة: ${getMaintenanceText(maintenanceStatus.value)}

الملاحظات:
${vehicleNotes.value || "لا يوجد"}

وقت التحديث:
${new Date().toLocaleString("ar-SA")}

`;


    const whatsappURL =

    "https://wa.me/?text="

    +

    encodeURIComponent(message);



    window.open(

        whatsappURL,

        "_blank"

    );



    renderVehicles();



    resetForm();


}



/*=========================================================
                إنشاء رابط واتساب
=========================================================*/

function openWhatsApp(message){


    const url =

    "https://wa.me/?text="

    +

    encodeURIComponent(message);



    window.open(

        url,

        "_blank"

    );


}



/*=========================================================
                    END PART 12
=========================================================*/
/*=========================================================
                STARTUP MODULE
                PART 13
=========================================================*/


/*=========================================================
                تشغيل المشروع
=========================================================*/

function initializeApp(){


    hideAllPages();



    homePage.style.display =
    "block";



    startClock();



    renderVehicles();



}



/*=========================================================
                تشغيل بعد تحميل الصفحة
=========================================================*/

document.addEventListener(

    "DOMContentLoaded",

    function(){


        initializeApp();


    }

);



/*=========================================================
                    END PART 13
=========================================================*/
