
import { useForm } from "react-hook-form"
import axios from "axios";


export default function () {

    type TestFormData = {
        text?: string;
        file?: File;
    }

    const { register, handleSubmit } = useForm<TestFormData>()

    const test = async (data: TestFormData) => {
        console.log(data);
        axios.post(
            '/api/test/do',
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })
    }

    return(
        <>
            <h1>Test Page</h1>
            <form onSubmit={handleSubmit(test)} encType="multipart/form-data">
                <input {...register("text")} type="text" />
                <input {...register("file")} type="file" accept="image/gif, image/jpeg, image/png, image/webp" />
                <input type="submit" />
            </form>
        </>
    )
}