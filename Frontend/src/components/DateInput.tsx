import DateInput from '../components/DateInput';

const CreditOptionPage = () => {
  const [expirationDate, setExpirationDate] = useState<string>('');

  const handleExpirationDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpirationDate(e.target.value);
  };

  return (
    <form>
      <DateInput
        value={expirationDate}
        onChange={handleExpirationDateChange}
      />
    </form>
  );
};

export default CreditOptionPage;

