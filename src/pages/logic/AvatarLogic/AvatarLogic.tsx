import { useUidUser } from "../../../utils/user";
import { Avatar } from "../../../components/ui/Avatar/Avatar";
import { useNavigate } from "react-router-dom";

export const AvatarLogic = ({
	uid,
	small,
}: {
	uid: string;
	small?: boolean;
}) => {
	const { user, loading } = useUidUser(uid);

	const navigate = useNavigate();

	return (
		<Avatar
			imageUrl={user?.photoUrl}
			name={!small ? user?.name.split(" ").at(0) : ""}
			loading={loading}
			onClick={() => navigate(`/user/${uid}`)}
		/>
	);
};
