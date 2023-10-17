using Microsoft.AspNetCore.Mvc;


public class HomeController : Controller
{
    [HttpGet] // Add an HTTP GET endpoint to render the HTML page
    public IActionResult Index()
    {
        return View();
    }

    [HttpPost("calculateCost")]
    public ActionResult<decimal> CalculateCost([FromBody] CalculationParameters parameters)
    {
      
        if (parameters.SelectedLLM == "GPT-3.5-Turbo")
        {
            decimal costPerDay = parameters.Employees * parameters.Frequency * parameters.PromptTokens * 0.0015M / 1000 + parameters.Employees * parameters.Frequency * parameters.CompletionsTokens * 0.002M / 1000;
            return Ok(costPerDay);
        }
        else if (parameters.SelectedLLM == "GPT-4")
        {
            decimal costPerDay = parameters.Employees * parameters.Frequency * parameters.PromptTokens * 0.03M / 1000 + parameters.Employees * parameters.Frequency * parameters.CompletionsTokens * 0.06M / 1000;
            return Ok(costPerDay);
        }

        return BadRequest("Invalid LLM selection.");
    }
}

public class CalculationParameters
{
    public string SelectedLLM { get; set; }
    public int Employees { get; set; }
    public int Frequency { get; set; }
    public int PromptTokens { get; set; }
    public int CompletionsTokens { get; set; }
}
