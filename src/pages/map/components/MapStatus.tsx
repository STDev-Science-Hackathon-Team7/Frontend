import { Status } from "@googlemaps/react-wrapper";

interface LoadingMessageProps {
	message: string;
}

export const LoadingMessage = ({ message }: LoadingMessageProps) => (
	<div className="h-full w-full flex items-center justify-center">{message}</div>
);

export const renderStatus = (status: Status) => {
	switch (status) {
		case Status.LOADING:
			return <LoadingMessage message="지도를 불러오는 중..." />;
		case Status.FAILURE:
			return <LoadingMessage message="지도를 불러오는데 실패했습니다." />;
		case Status.SUCCESS:
			return <></>;
	}
};
