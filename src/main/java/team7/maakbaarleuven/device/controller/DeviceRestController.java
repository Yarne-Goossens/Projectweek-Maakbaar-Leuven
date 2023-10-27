package team7.maakbaarleuven.device.controller;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.http.HttpRequest;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.actuate.web.exchanges.HttpExchange.Session;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.xhtmlrenderer.pdf.ITextRenderer;

import com.lowagie.text.DocumentException;

import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;


import team7.maakbaarleuven.device.model.Device;
import team7.maakbaarleuven.device.service.DeviceService;

@CrossOrigin(origins = "http://127.0.0.1:5500")
@RestController
@RequestMapping("/api/devices")
public class DeviceRestController extends HttpServlet{
    
        @Autowired
        private DeviceService deviceService;
    
        @GetMapping("/overview")
        public List<Device> getAllDevices() {
            return deviceService.getAllDevices();
        }
        @PostMapping("/add")
        public Device addDevice(@RequestBody Device device){
            return deviceService.addDevice(device);
            
        }
        
     
        @GetMapping("/generate-pdf-test")
        public ResponseEntity<byte[]> generateTestPdf() {
            try {
                PDDocument document = new PDDocument();
                PDPage page = new PDPage(PDRectangle.A4);
                document.addPage(page);

                PDPageContentStream contentStream = new PDPageContentStream(document, page);
                contentStream.setFont(PDType1Font.HELVETICA_BOLD, 12);
                contentStream.beginText();
                contentStream.newLineAtOffset(100, 700);
                contentStream.showText("Hello, PDFBox!");
                contentStream.endText();
                contentStream.close();

                ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
                document.save(byteArrayOutputStream);
                document.close();

                // Set the response headers
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_PDF);
                headers.setContentDispositionFormData("attachment", "example.pdf");

                return new ResponseEntity<>(byteArrayOutputStream.toByteArray(), headers, HttpStatus.OK);
            } catch (Exception e) {
                e.printStackTrace();
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        @GetMapping("/generate-pdf")
        public ResponseEntity<byte[]> generatePdf(HttpServletRequest request, HttpServletResponse response) {
        try {
            // Generate the PDF and convert it to a byte array
            
            String currentHtml = (String) request.getParameter("param1");
            System.out.println(currentHtml);
            //String htmlContent = "<html><body><h1>My Current Page</h1><p>This is my HTML content.</p></body></html>";
            ByteArrayOutputStream pdfStream = generatePdfContent(currentHtml);
            // Set the response headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("attachment", "current_page.pdf");

            return new ResponseEntity<>(pdfStream.toByteArray(), headers, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

        public ByteArrayOutputStream generatePdfContent(String htmlContent) throws IOException, DocumentException {
            // Create an instance of ITextRenderer from Flying Saucer
            ITextRenderer renderer = new ITextRenderer();
            
            // Set the base URL for resolving relative links and resources
            String baseUrl = "file://" + System.getProperty("user.dir") + "/";

            // Configure the ITextRenderer with the HTML content and base URL
            renderer.setDocumentFromString(htmlContent, baseUrl);
            
            // Layout and render the content to a PDF
            renderer.layout();
            
            ByteArrayOutputStream pdfStream = new ByteArrayOutputStream();
            
            // Generate the PDF content
            renderer.createPDF(pdfStream);
            
            // Close the ITextRenderer
            renderer.finishPDF();
            
            return pdfStream;
        }
}


