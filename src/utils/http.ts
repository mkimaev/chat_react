import { ToastOptions, toast } from "react-toastify";

const toastingDelay: ToastOptions = {
    position: "top-right",
    autoClose: 2000,
    theme: "light",
    }

class Agent {

    async get(url: string) {
        const response = await fetch(url);

        if (!response.ok) {
            let message = 'Failed to fetch data.';
            toast.error(message);
            throw new Error(message);
        }

        const data = await response.json() as unknown;
        return data;
    }

    async post(url: string, params: any) {

        /*
        body: JSON.stringify({
                    name: userName,
                    age: parseInt(userAge, 10)
                })
        */

        const response = await fetch(url, {
            method: "POST",
            headers: { "Accept": "application/json", "Content-Type": "application/json" },
            body: JSON.stringify(params),
        });

        if (!response.ok) {
            let message = 'Failed to post data.';
            toast.error('Failed to post data.', toastingDelay);
            throw new Error(message);
        }

        const data = await response.json() as unknown;
        return data;
    }

    async put(url: string, params?: any, needDataBack: boolean = false) {
        const response = await fetch(url, {
            method: "PUT",
            headers: { "Accept": "application/json", "Content-Type": "application/json" },
            body: params
        });

        if (!response.ok) {
            let message = 'Failed to put data.';
            toast.error(message);
            throw new Error(message);
        }

        if (needDataBack){
            const data = await response.json() as unknown;
            return data;
        }

        //return data;
    }

    async delete(url: string) {

        const response = await fetch(url, {
            method: "DELETE",
            headers: { "Accept": "application/json" }
        });

        if (!response.ok) {
            let message = 'Failed to delete data.';
            toast.error(message);
            throw new Error(message);
        }

        if (response.ok === true) {
            const text = await response.text();
            return text;
        }
    }
}



export default Agent;