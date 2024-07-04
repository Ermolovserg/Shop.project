import axios from "axios";
import { IAuthRequisites } from "@Shared/types";
import { host } from "./const";

export async function verifyRequisites(
    requisites: IAuthRequisites
): Promise<boolean> {
    try {
        const { status } = await axios.post(
            `${host}/auth`,
            requisites
        );

        return status === 200;
    } catch (e) {
        return false;
    }
}