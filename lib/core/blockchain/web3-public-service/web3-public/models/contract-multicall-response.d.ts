import { Web3PrimitiveType } from "../../../models/web3-primitive-type";
export interface ContractMulticallResponse<Output extends Web3PrimitiveType> {
    success: boolean;
    output: Output | null;
}
