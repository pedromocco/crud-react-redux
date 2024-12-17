import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "./UI/Table";
import { Badge } from "./UI/Badge";
import { Card } from "./UI/Card";
import { useAppSelector } from "../hooks/store";
import { useUserActions } from "../hooks/useUserActions";
import { Button } from "./UI/Button";
import EditUser from "./EditUser";
import { UserWithId } from "../store/users/slice";
import { Dialog, DialogTrigger, DialogContent } from "./UI/Dialog";

export default function ListOfUser() {
  const users = useAppSelector((state) => state.users);
  const { removeUser } = useUserActions();
  const [editingUser, setEditingUser] = useState<UserWithId | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEditClick = (user: UserWithId) => {
    setEditingUser(user);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingUser(null);
  };

  return (
    <>
      <Card>
        <h1 className="font-semibold text-gray-900 dark:text-gray-50">
          Usuarios
          <Badge style={{ marginLeft: "8px" }}> {users.length} </Badge>
        </h1>
        <Table className="mt-8">
          <TableHead>
            <TableRow className="border-b border-tremor-border dark:border-dark-tremor-border">
              <TableHeaderCell>ID</TableHeaderCell>
              <TableHeaderCell>Nombre</TableHeaderCell>
              <TableHeaderCell>Email</TableHeaderCell>
              <TableHeaderCell>Github</TableHeaderCell>
              <TableHeaderCell>Acciones</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell style={{ display: "flex", alignItems: "center" }}>
                  <img
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      marginRight: "8px",
                    }}
                    src={`https://unavatar.io/github/${item.github}`}
                    alt={item.name}
                  />
                  {item.name}
                </TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.github}</TableCell>
                <TableCell>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button style={{marginRight: "8px"}} type="button" onClick={() => handleEditClick(item)}>
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      {editingUser && <EditUser id={editingUser.id} userData={editingUser} onClose={handleCloseDialog} />}
                    </DialogContent>
                  </Dialog>
                  <Button type="button" onClick={() => removeUser(item.id)}>
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
}
