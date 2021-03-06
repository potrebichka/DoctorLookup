import $ from "jquery";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { FindDoctor } from './doctorService';
import { CoordinatesFromAddress} from './coordinatesFromLocation';

$(function() {

    let lat, lon;
    let findDoctor = new FindDoctor();
    (async () => {
        try {
            let specialities = await findDoctor.getSpecialities();
            let listsOfSpecialities = specialities.data;
            displayListOfSpecialities(listsOfSpecialities);
        } catch(error) {
            console.error("There was an error handling your request: " + error.message);
        }
    })(); 
    
    function displayListOfSpecialities(listsOfSpecialities) {
        console.log(listsOfSpecialities);
        for (let i=0; i< listsOfSpecialities.length; i++) {
            $("#specialitiesList").append(`<option value=${listsOfSpecialities[i].uid}>${listsOfSpecialities[i].name}</option>`)
        }
    }


    $("#findLocationForm").submit(function(event) {
        event.preventDefault();
        $(".notFound").text("");
        $("ul").empty();
        const location = $("#userLocationInput2").val();    
        

        if (!location) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    lat = position.coords.latitude;
                    lon=position.coords.longitude;
                });
            } else {
                //Seattle coords
                lat = "47.608013";
                lon = "-122.335167";
            }
        } else {
            (async() => {
                try {
                    let coordinatesFromLocation = new CoordinatesFromAddress();
                    const response = await coordinatesFromLocation.getCoordinates(location);
                    lat = response.results[0].geometry.lat;
                    lon =  response.results[0].geometry.lng;

                } catch(error) {
                    console.error("There was an error handling your request: " + error.message);
                }

            })();
        }
        $("form").show();
    });

    $("#findDoctorBySpecialityForm").submit(function(event) {
        event.preventDefault();
        $(".notFound").text("");
        $("ul").empty();
        const speciality = $("#userSpecialityInput").val();        
        getDoctorsBySpeciality(speciality, lat, lon);
       
    });

    function getDoctorsBySpeciality(speciality, lat, lon){
        (async () => {
            try {
                const response = await findDoctor.getDoctorBySpeciality(speciality , lat, lon);
                if (response.data.length > 0) {
                    showDoctorBySpeciality(response.data);
                } else {
                    $("#notFound").text("No doctor was found");
                    $(".results").show();
                }
                
            } catch(error) {
                $("#notFound").text("No doctor found");
                $(".results").show();
            }
            
        })();
    }

    function showDoctorBySpeciality(response) {
        $("#listOfDoctorsBySpeciality").empty();
        for (let i=0; i< response.length; i++) {
            $("#listOfDoctorsBySpeciality").append(displayDoctor(response[i]));
        }
        $(".results").show();
        location.href = "#listOfDoctorsBySpeciality";
    }


    $("#findDoctorByIssueForm").submit(function(event) {
        event.preventDefault();
        $(".notFound").text("");
        $("ul").empty();
        const medicalIssue = $("#userIssueInput").val();        
        getDoctorsByIssue(medicalIssue, lat, lon);
       
    });

    function getDoctorsByIssue(medicalIssue, lat, lon){
        console.log(medicalIssue, lat, lon);
        (async () => {
            try {
                let findDoctor = new FindDoctor();
                const response = await findDoctor.getDoctorByIssue(medicalIssue , lat, lon);
                if (response.data.length > 0) {
                    showDoctorByIssue(response.data);
                } else {
                    $("#notFound").text("No doctor was found");
                    $(".results").show();
                }
                
            } catch(error) {
                $("#notFound").text("No doctor found");
                $(".results").show();
            }
            
        })();
    }

    function showDoctorByIssue(response) {
        $("#listOfDoctorsByIssue").empty();
        for (let i=0; i< response.length; i++) {
            $("#listOfDoctorsByIssue").append(displayDoctor(response[i]));
        }
        $(".results").show();
        location.href = "#listOfDoctorsByIssue";
    }

    $("#findDoctorByNameForm").submit(function(event) {
        event.preventDefault();
        $(".notFound").text("");
        $("ul").empty();
        const name = $("#userNameInput").val();     
        getDoctorsByName(name,lat,lon);   
    });

    function getDoctorsByName(name, lat, lon){
        (async () => {
            try {
                const response = await findDoctor.getDoctorByName(name , lat, lon);
                if (response.data.length > 0) {
                    showDoctorByName(response.data);
                } else {
                    $("#notFound").text("No doctor was found");
                    $(".results").show();
                }
            } catch(error) {
                $("#notFound2").text("No doctor was found");
                $(".results").show();
            }
        })();
    }
    

    function showDoctorByName(response) {
        $("#listDoctorsByName").empty();
        for (let i=0; i< response.length; i++) {
            $("#listOfDoctorsByName").append(displayDoctor(response[i]));
        }
        $(".results").show();
        location.href = "#listOfDoctorsByName";
    }

    function displayDoctor(data) {
        console.log(data);
        let phone = "";
        for (let i=0; i<data.practices[0].phones.length; i++) {
            if (data.practices[0].phones[i].type === "landline") {
                phone = data.practices[0].phones[i].number;
            }
        }
        return `<li><strong>First name:</strong> ${data.profile.first_name}<br>
            <strong>Last name:</strong> ${data.profile.last_name}<br>
            <strong>Address:</strong> ${data.practices[0].visit_address.street} ${data.practices[0].visit_address.street2}, ${data.practices[0].visit_address.city}, ${data.practices[0].visit_address.state}, ${data.practices[0].visit_address.zip}<br>
            <strong>Phone number:</strong> ${phone}<br>
            <strong>Accepting new patients:</strong> ${data.practices[0].accepts_new_patients ? "yes" : "no"}
        </li>`
    }

    $("#userLocationInput").focus(function() {
        $("#findDoctorByIssueForm").hide();
        $("#findDoctorByNameForm").hide();
        $("#findDoctorBySpecialityForm").hide();
        $(".notFound").text("");
        $("ul").empty();
    });

    $("#userIssueInput").focus(function() {
        $(".notFound").empty();
        $("ul").empty();
    })

    
    $("#userNameInput").focus(function() {
        $(".notFound").empty();
        $("ul").empty();
    })

    $("#specialitiesList").focus(function() {
        $(".notFound").empty()
        $("ul").empty();
    })
});