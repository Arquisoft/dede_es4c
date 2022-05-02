package profileviewer

import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class loadtest extends Simulation {

	private val httpProtocol = http
    .baseUrl("http://localhost:5000")
    .inferHtmlResources(AllowList(), DenyList())
    .acceptHeader("*/*")
    .acceptEncodingHeader("gzip, deflate")
    .acceptLanguageHeader("en-US,en;q=0.5")
    .userAgentHeader("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:99.0) Gecko/20100101 Firefox/99.0");
  
  
  private val headers_0 = Map(
  		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  		"Upgrade-Insecure-Requests" -> "1"
  )
  
  private val uri1 = "localhost"

  private val scn = scenario("GetUsersList")
    .exec(
      http("GetOrders")
        .get("/api/orders")
        .headers(headers_0)
    )
    .pause(24)
    .exec(
      http("GetProducts")
        .options("/api/pinchos/")
        .headers(headers_0)
        .resources(
          http("GetDrinkProducts")
            .post("/api/pinchos/bebida")
            .headers(headers_0),
          http("GetDessertProducts")
            .get("/api/pinchos/postre")
            .headers(headers_0)
        )
    )

	setUp(scn.inject(constantUsersPerSec(50).during(60))).protocols(httpProtocol)
}