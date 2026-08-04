/*=========================================================
                DATA MANAGER
=========================================================*/

function getVehicleById(id){

    return vehicles.find(v=>v.id===Number(id));

}


function getVehiclesByType(type){

    return vehicles.filter(v=>v.type===type);

}


function getVehicleTypes(){

    return [

        "PRIVATE",

        "TRUCKS",

        "EQUIPMENT",

        "SPECIAL",

        "GENERATORS"

    ];

}


function getTypeName(type){

    switch(type){

        case "PRIVATE":
            return "المركبات الصغيرة";

        case "TRUCKS":
            return "رؤوس الشاحنات والقاطرات";

        case "EQUIPMENT":
            return "المعدات الكبيرة والصغيرة";

        case "SPECIAL":
            return "السيارات المتخصصة";

        case "GENERATORS":
            return "المولدات والمضخات";

        default:
            return "";

    }

}


function updateVehicle(id,data){

    const vehicle=getVehicleById(id);

    if(!vehicle) return false;


    Object.assign(vehicle,data);

    vehicle.lastUpdate=new Date().toISOString();

    return true;

}


function resetForm(){

    vehicleType.value="";

    vehicleNumber.innerHTML=

    "<option value=''>اختر</option>";

    driverName.textContent="---";

    vehicleStatus.value="working";

    driverStatus.value="present";

    maintenanceStatus.value="none";

    vehicleNotes.value="";

}
/*=========================================================
            VEHICLE REGISTRATION MODULE
=========================================================*/

function loadVehicleNumbers(){

    vehicleNumber.innerHTML =
    "<option value=''>اختر</option>";

    driverName.textContent="---";

    if(vehicleType.value==="") return;

    const list =
    getVehiclesByType(vehicleType.value);

    list.forEach(vehicle=>{

        const option =
        document.createElement("option");

        option.value =
        vehicle.id;

        option.textContent =
        vehicle.number;

        vehicleNumber.appendChild(option);

    });

}


function loadVehicleInformation(){

    const vehicle =
    getVehicleById(vehicleNumber.value);

    if(!vehicle){

        driverName.textContent="---";

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
    vehicle.notes;

}


function saveVehicleReport(){

    const vehicle =
    getVehicleById(vehicleNumber.value);

    if(!vehicle){

        alert("يرجى اختيار المركبة");

        return;

    }

    updateVehicle(vehicle.id,{

        status:
        vehicleStatus.value,

        driverStatus:
        driverStatus.value,

        maintenance:
        maintenanceStatus.value,

        notes:
        vehicleNotes.value.trim()

    });

    alert("تم حفظ البيانات بنجاح");

    renderVehicles();

    resetForm();

}


vehicleType.addEventListener(

    "change",

    loadVehicleNumbers

);


vehicleNumber.addEventListener(

    "change",

    loadVehicleInformation

);
/*=========================================================
                STATISTICS MODULE
=========================================================*/

function getSectionStatistics(type){

    const list =
    getVehiclesByType(type);

    return{

        total:
        list.length,

        working:
        list.filter(v=>v.status==="working").length,

        stopped:
        list.filter(v=>v.status==="stopped").length

    };

}


function updateSectionCard(type,prefix){

    const data =
    getSectionStatistics(type);

    document.getElementById(

        prefix+"Total"

    ).textContent =
    data.total;

    document.getElementById(

        prefix+"Working"

    ).textContent =
    data.working;

    document.getElementById(

        prefix+"Stopped"

    ).textContent =
    data.stopped;

}


function updateStatistics(){

    const sections=[

        {
            type:"PRIVATE",
            prefix:"private"
        },

        {
            type:"TRUCKS",
            prefix:"trucks"
        },

        {
            type:"EQUIPMENT",
            prefix:"equipment"
        },

        {
            type:"SPECIAL",
            prefix:"special"
        },

        {
            type:"GENERATORS",
            prefix:"generator"
        }

    ];

    sections.forEach(section=>{

        updateSectionCard(

            section.type,

            section.prefix

        );

    });

}
/*=========================================================
                    RENDER MODULE
=========================================================*/

function renderVehicles(){

    const sections=[

        {
            type:"PRIVATE",
            container:"privateSection"
        },

        {
            type:"TRUCKS",
            container:"trucksSection"
        },

        {
            type:"EQUIPMENT",
            container:"equipmentSection"
        },

        {
            type:"SPECIAL",
            container:"specialSection"
        },

        {
            type:"GENERATORS",
            container:"generatorSection"
        }

    ];

    sections.forEach(section=>{

        renderSection(

            section.type,

            section.container

        );

    });

    updateStatistics();

}



function renderSection(type,containerId){

    const container=

    document.getElementById(containerId);

    if(!container) return;

    container.innerHTML="";

    const list=

    getVehiclesByType(type);

    list.forEach(vehicle=>{

        container.appendChild(

            createVehicleRow(vehicle)

        );

    });

}



function createVehicleRow(vehicle){

    const row=

    document.createElement("div");

    row.className="vehicle-card";


    row.innerHTML=`

<div class="vehicle-status ${getVehicleStatusClass(vehicle.status)}">

${getVehicleStatusText(vehicle.status)}

</div>

<div class="vehicle-number">

${vehicle.number}

</div>

<div class="vehicle-driver">

${vehicle.driver}

</div>

<div class="vehicle-driver-status ${getDriverStatusClass(vehicle.driverStatus)}">

${getDriverStatusText(vehicle.driverStatus)}

</div>

<div class="vehicle-maintenance ${getMaintenanceClass(vehicle.maintenance)}">

${getMaintenanceText(vehicle.maintenance)}

</div>

<div class="vehicle-update">

${formatLastUpdate(vehicle.lastUpdate)}

</div>

`;

    return row;

}



/*=========================================================
                TEXT HELPERS
=========================================================*/

function getVehicleStatusText(status){

    return status==="working"

    ? "تعمل"

    : "لا تعمل";

}



function getDriverStatusText(status){

    switch(status){

        case "present":
            return "حاضر";

        case "absent":
            return "غائب";

        case "sick":
            return "إجازة مرضية";

        case "annual":
            return "إجازة سنوية";

        default:
            return "-";

    }

}



function getMaintenanceText(status){

    switch(status){

        case "none":
            return "لا يوجد";

        case "periodic":
            return "صيانة دورية";

        case "emergency":
            return "صيانة طارئة";

        default:
            return "-";

    }

}



/*=========================================================
                CSS CLASSES
=========================================================*/

function getVehicleStatusClass(status){

    return status==="working"

    ? "status-working"

    : "status-stopped";

}



function getDriverStatusClass(status){

    switch(status){

        case "present":
            return "driver-present";

        case "absent":
            return "driver-absent";

        case "sick":
            return "driver-sick";

        case "annual":
            return "driver-annual";

        default:
            return "";

    }

}



function getMaintenanceClass(status){

    switch(status){

        case "none":
            return "maintenance-none";

        case "periodic":
            return "maintenance-periodic";

        case "emergency":
            return "maintenance-emergency";

        default:
            return "";

    }

}



/*=========================================================
                LAST UPDATE
=========================================================*/

function formatLastUpdate(value){

    if(!value)

        return "-";

    const date=new Date(value);

    if(isNaN(date))

        return "-";

    return date.toLocaleString("ar-SA",{

        year:"2-digit",

        month:"2-digit",

        day:"2-digit",

        hour:"2-digit",

        minute:"2-digit"

    });

}
