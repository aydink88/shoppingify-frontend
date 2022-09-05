import { Stack, Row, Col } from 'react-bootstrap';
import { fetchTopCategories, fetchTopItems } from 'src/services/stats';

//import MonthlySummary from './MonthlySummary';
import TopBars from './TopBars';

export default function Stats() {
  return (
    <Stack>
      <Row>
        <Col xs={12} sm={6} md={12} lg={6}>
          <TopBars title="Top Items" fetchData={fetchTopItems} />
        </Col>
        <Col xs={12} sm={6} md={12} lg={6}>
          <TopBars title="Top Categories" fetchData={fetchTopCategories} variant="info" />
        </Col>
      </Row>
      {/* <MonthlySummary />*/}
    </Stack>
  );
}
