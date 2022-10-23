interface SpacerProps {
	fields: {
		spacerAmount: number;
	};
}

const Spacer = ({ fields }: SpacerProps) => {
	return <section style={{ height: fields?.spacerAmount + 'px' }}></section>;
};
export default Spacer;
