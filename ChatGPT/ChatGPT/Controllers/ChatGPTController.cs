using Microsoft.AspNetCore.Mvc;
using OpenAI_API.Chat;
using OpenAI_API;
using Standard.AI.OpenAI.Models.Services.Foundations.ChatCompletions;
using ChatGPT.Models;
using Newtonsoft.Json;
using System.Text;
using ChatRequest = ChatGPT.Models.ChatRequest;


[ApiController]
public class ChatGPTController : ControllerBase
{
    [HttpPost]
    [Route("AskChatGPT")]
    public async Task<IActionResult> AskChatGPT([FromBody] QueryModel model)
    {
        string query = model.Query;
        string chatURL = "https://api.openai.com/v1/chat/completions";
        string apiKey = "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";
        StringBuilder sb = new StringBuilder();

        HttpClient oClient = new HttpClient();
        oClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {apiKey}");

        ChatRequest oRequest = new ChatRequest();
        oRequest.model = "gpt-3.5-turbo";

        Message oMessage = new Message();
        oMessage.role = "user";
        oMessage.content = query;

        oRequest.messages = new Message[] { oMessage };

        string oReqJSON = JsonConvert.SerializeObject(oRequest);
        HttpContent oContent = new StringContent(oReqJSON, Encoding.UTF8, "application/json");

        HttpResponseMessage oResponseMessage = await oClient.PostAsync(chatURL, oContent);

        if (oResponseMessage.IsSuccessStatusCode)
        {
            string oResJSON = await oResponseMessage.Content.ReadAsStringAsync();

            ChatResponse oResponse = JsonConvert.DeserializeObject<ChatResponse>(oResJSON);

            foreach (Choice c in oResponse.choices)
            {
                sb.Append(c.message.content);
            }

            HttpChatGPTResponse oHttpResponse = new HttpChatGPTResponse()
            {
                Success = true,
                Data = sb.ToString()
            };

            return Ok(oHttpResponse);
        }
        else
        {
            string oFailReason = await oResponseMessage.Content.ReadAsStringAsync();
            return BadRequest(oFailReason); ;
        }
    }
}