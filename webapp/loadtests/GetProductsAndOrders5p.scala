
import java.time.Duration;
import java.util.*;

import io.gatling.javaapi.core.*;
import io.gatling.javaapi.http.*;
import io.gatling.javaapi.jdbc.*;

import static io.gatling.javaapi.core.CoreDsl.*;
import static io.gatling.javaapi.http.HttpDsl.*;
import static io.gatling.javaapi.jdbc.JdbcDsl.*;

public class p2 extends Simulation {

  {
    HttpProtocolBuilder httpProtocol = http
      .baseUrl("http://localhost:5000")
      .inferHtmlResources(AllowList(), DenyList(".*\\.js", ".*\\.css", ".*\\.gif", ".*\\.jpeg", ".*\\.jpg", ".*\\.ico", ".*\\.woff", ".*\\.woff2", ".*\\.(t|o)tf", ".*\\.png", ".*detectportal\\.firefox\\.com.*"))
      .acceptHeader("*/*")
      .acceptEncodingHeader("gzip, deflate")
      .acceptLanguageHeader("es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3")
      .doNotTrackHeader("1")
      .originHeader("http://localhost:3000")
      .userAgentHeader("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:99.0) Gecko/20100101 Firefox/99.0");
    
    Map<CharSequence, String> headers_0 = new HashMap<>();
    headers_0.put("If-None-Match", "W/\"1392-0lYs/idB/03MvfZkTLTpuB8JQT8\"");
    headers_0.put("Sec-GPC", "1");
    
    Map<CharSequence, String> headers_1 = new HashMap<>();
    headers_1.put("Access-Control-Request-Headers", "content-type");
    headers_1.put("Access-Control-Request-Method", "POST");
    headers_1.put("Sec-GPC", "1");
    
    Map<CharSequence, String> headers_2 = new HashMap<>();
    headers_2.put("Content-Type", "application/json");
    headers_2.put("Sec-GPC", "1");


    ScenarioBuilder scn = scenario("p2")
      .exec(
        http("request_0")
          .get("/products")
          .headers(headers_0)
      )
      .pause(24)
      .exec(
        http("request_1")
          .options("/orders/price")
          .headers(headers_1)
          .resources(
            http("request_2")
              .post("/orders/price")
              .headers(headers_2)
              .body(RawFileBody("p2/0002_request.html"))
              .check(status().is(400)),
            http("request_3")
              .post("/orders/price")
              .headers(headers_2)
              .body(RawFileBody("p2/0003_request.html"))
              .check(status().is(400))
          )
      )
      .pause(11)
      .exec(
        http("request_4")
          .get("/products")
          .headers(headers_0)
      );

	  setUp(scn.injectOpen(rampUsers(50).during(60))).protocols(httpProtocol);
  }
}
