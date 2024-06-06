import { Table, TableHeader, TableRow, TableHeaderCell, TableBody, TableCell } from "semantic-ui-react";
import { IPlaceHolderUser } from "../../app/models/user";



export default function TableComponent(props?: any) {
    let users: IPlaceHolderUser[] = props.users;
    let textSize = {fontSize: '0.9em'};
    return (
        <>
            {users && users.length &&
                <Table compact='very' style={textSize}>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderCell>Id</TableHeaderCell>
                            <TableHeaderCell>Email</TableHeaderCell>
                            <TableHeaderCell>Name</TableHeaderCell>
                            <TableHeaderCell>phone</TableHeaderCell>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {users.map((user) =>
                        <TableRow key={user.id}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.phone}</TableCell>
                        </TableRow>)}

                    </TableBody>
                </Table>
            }
        </>
    );
}