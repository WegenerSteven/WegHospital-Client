import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";


const DoctorEditForm = () => {
    const navigate = useNavigate();
    const {id} = useForm({from: '/doctor-edit/$id'});
    const [doctor, setDoctor] = useState<any>(null);


    return (
        <div>
            
        </div>
    );
}

export default DoctorEditForm;
