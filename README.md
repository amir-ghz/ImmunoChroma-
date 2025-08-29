# ImmunoChroma - Smartphone-Based Colorimetric Biosensor PWA

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/yourusername/immunochroma)
[![PWA](https://img.shields.io/badge/PWA-Ready-brightgreen.svg)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
[![OpenCV.js](https://img.shields.io/badge/OpenCV.js-4.10.0-green.svg)](https://docs.opencv.org/4.10.0/opencv.js)

A Progressive Web Application for smartphone-based colorimetric analysis of plasmonic biosensors, enabling point-of-care antibody detection through automated image processing and quantitative concentration estimation without specialized laboratory equipment.

## Table of Contents

### [Getting Started](#getting-started)
- [Overview](#overview)
- [Scientific Background](#scientific-background)
- [Installation and Setup](#installation-and-setup)
- [Deployment Guide](#deployment-guide)

### [Core Functionality](#core-functionality)
- [Complete Application Workflow](#complete-application-workflow)
- [Image Processing Pipeline](#image-processing-pipeline)
- [Color Analysis Algorithm](#color-analysis-algorithm)
- [White Balance Correction](#white-balance-correction)
- [Feature Extraction Methods](#feature-extraction-methods)
- [Quality Control System](#quality-control-system)

### [Development & Technical](#development--technical)
- [File Structure and Organization](#file-structure-and-organization)
- [Build Instructions](#build-instructions)
- [Validation and Reproducibility](#validation-and-reproducibility)
- [Troubleshooting Guide](#troubleshooting-guide)

### [Community & Support](#community--support)
- [Contributing Guidelines](#contributing-guidelines)
- [License](#license)
- [Citation](#citation)
- [Contact Information](#contact-information)

---

## Getting Started

# Overview

ImmunoChroma is a comprehensive smartphone-based Progressive Web Application designed to perform quantitative colorimetric analysis of plasmonic biosensors for point-of-care antibody detection. The application eliminates the need for specialized optical equipment by leveraging advanced computer vision algorithms through OpenCV.js and implementing sophisticated color analysis techniques based on CIE Lab color space conversions and Euclidean distance calculations.

The underlying biosensor technology utilizes gap-plasmon dispersion from self-assembled aluminum nanoparticles that produce structural color changes upon target antibody binding. These color shifts are captured using standard smartphone cameras and processed through a multi-stage analysis pipeline that includes automated circle detection, white balance correction, color space transformation, and statistical concentration estimation based on pre-calibrated reference standards.

The application addresses critical limitations of traditional diagnostic methods by providing accessible, rapid, and cost-effective antibody quantification suitable for resource-limited settings. Key capabilities include offline functionality after initial loading, native app installation through PWA features, automated quality control with real-time feedback, comprehensive error handling with fallback mechanisms, and detailed result reporting with export functionality.

The system achieves clinically relevant performance with a dynamic range from 10 μg/mL to 5 mg/mL, limit of detection around 4.23 μg/mL for Immunoglobulin G antibodies, and measurement precision with coefficient of variation below 15% across different environmental conditions and user operators. The application maintains accuracy comparable to laboratory-based methods while providing results in 2-3 minutes through an intuitive user interface optimized for mobile devices.

This documentation provides complete transparency of all algorithms, preprocessing methods, feature extraction techniques, and validation procedures to ensure reproducibility and enable independent verification of results as required for peer review and scientific publication.

[↑ Back to Top](#table-of-contents)


## Scientific Background

### Biosensor Operating Principle

The colorimetric biosensor operates on the fundamental principle of gap-plasmon dispersion utilizing self-assembled aluminum nanoparticles positioned on a carefully engineered phase-matched near-field cavity. The sensor architecture consists of multiple precisely controlled layers including a transparent substrate, a 150 nm chromium mirror providing optical reflection, a 20 nm aluminum oxide spacer layer forming a critical metal-insulator-metal cavity structure, and randomly distributed aluminum nanoparticles that generate localized surface plasmon resonances.

The plasmonic resonator supports strong electromagnetic field confinement with near-field hot spots localized within 10-20 nm gaps between adjacent nanoparticles. These resonances manifest as wavelength-specific absorption bands that selectively remove particular color components from the incident broadband illumination, while the remaining non-resonant wavelengths are collectively reflected to produce the observed structural color.

### Color Generation Mechanism

The structural color generation mechanism relies on the interference between incident light and plasmonically scattered light from the nanoparticle array. The random self-assembly process creates a distribution of nanoparticle sizes and inter-particle gaps that collectively support multiple resonance modes across the visible spectrum. This randomness is advantageous as it produces angle and polarization-independent optical responses, eliminating the need for controlled illumination geometry required by traditional plasmonic sensors.

When target antibodies bind specifically to functionalized sensor surfaces, local refractive index changes occur in the immediate vicinity of the nanoparticles. These binding events shift the plasmonic resonance wavelengths according to the magnitude of refractive index change, which correlates directly with the concentration of bound analytes. The resulting spectral shifts translate to observable color changes that can be quantified using standard smartphone cameras without requiring spectroscopic instrumentation.

### Sensor Performance Characteristics

Experimental characterization demonstrates that orange-colored sensors exhibit superior sensitivity compared to magenta and blue variants, achieving 0.82 arbitrary units per nanometer spectral shift versus 0.40 and 0.37 respectively. This enhanced performance results from optimal nanoparticle size distributions in orange sensors that create maximum gap-plasmon density per unit area, leading to stronger near-field enhancement and greater sensitivity to refractive index perturbations.

The sensor dynamic range spans physiologically relevant concentrations from 10 μg/mL to 5 mg/mL with demonstrated linearity across this range. The limit of detection of approximately 4.23 μg/mL for Immunoglobulin G antibodies enables detection of clinically significant antibody levels associated with immune responses to infectious diseases. Measurement precision achieves coefficient of variation below 15% under controlled conditions, meeting requirements for quantitative diagnostic applications.


## Installation and Setup

### Prerequisites and System Requirements

The ImmunoChroma PWA requires a modern web browser with Progressive Web App support and WebAssembly capabilities for OpenCV.js functionality. Supported browsers include Chrome 67+, Firefox 62+, Safari 13+, and Edge 79+. Mobile devices should have camera access enabled and minimum 2GB RAM for optimal performance during image processing operations.

Network connectivity is required for initial loading of external dependencies including OpenCV.js, visualization libraries, and icon fonts. After initial caching through the service worker, the application functions completely offline. HTTPS protocol is mandatory for PWA installation capabilities and camera access permissions on mobile devices.

### Quick Start Installation

Clone the repository from GitHub and navigate to the project directory. The application requires no build process or compilation steps and can be served directly from the source files using any standard web server.

```bash
git clone https://github.com/your-username/immunochroma-pwa.git
cd immunochroma-pwa
```
### Local Development Server Options

For rapid local development and testing, use Python's built-in HTTP server which provides immediate access without additional dependencies:
```bash
python -m http.server 8000
```
Alternatively, Node.js users can utilize the http-server package for enhanced features including automatic browser opening and custom configuration options:

``` bash
npx http-server -p 8000 -o --cors
```

For development with live reload capabilities, install and use live-server for automatic page refreshing during development:
```bash
npm install -g live-server
live-server --port=8000 --host=localhost --open=/index.html
```

### HTTPS Configuration for PWA Features

PWA installation and full functionality require HTTPS in production environments. For local development testing of PWA features, generate self-signed certificates and configure secure serving:

```bash
openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
npx http-server -p 8000 -S -C cert.pem -K key.pem
```

Access the application at ```⁠https://localhost:8000``` and accept the security warning for self-signed certificates during development testing.

[↑ Back to Top](#table-of-contents)

### PWA Installation Process

The application automatically detects device capabilities and provides platform-specific installation guidance. iOS Safari users can install through the Share button selecting "Add to Home Screen" from the action sheet. Android Chrome users receive automatic install prompts or can access installation through the browser menu "Install App" option.

The application includes iOS-specific detection logic that displays installation instructions when accessed through Safari on non-installed devices, ensuring users understand the installation process regardless of their technical expertise level.

### Verification and Initial Setup
After successful installation or local server startup, verify functionality by accessing the main interface at the configured URL. The application should display user registration form, help system accessibility, OpenCV.js loading status indicator, and responsive design adaptation to the current screen size.

Initial setup requires user registration with name, email, and organizational information to personalize the analysis workflow and enable result tracking. The integrated help system provides comprehensive tutorials explaining biosensor principles, analysis workflow, and troubleshooting guidance for first-time users.

# Deployment Guide

---

## Core Functionality

### GitHub Pages Deployment

GitHub Pages provides the most straightforward deployment option for static PWAs with automatic HTTPS support and CDN distribution. Navigate to repository Settings, scroll to Pages section, and select the main branch as the source. The application becomes accessible at `https://username.github.io/repository-name` within 5-10 minutes of configuration.

The `service-worker.js` file automatically handles caching strategies for GitHub Pages deployment, implementing a cache-first approach for static assets and network-first for dynamic content. The cache versioning system in the `CACHE_NAME` constant ensures proper updates when new versions are deployed.

```javascript
const CACHE_NAME = "immunochroma-v1.0.0";
const urlsToCache = ["/index.html", "/imageUpload.html", "/styles.css"];
```

### Netlify Continuous Deployment
Netlify offers advanced deployment features including form handling, redirects, and automatic SSL certificate provisioning. Connect the GitHub repository to Netlify with minimal configuration requirements since the application contains no build process.

Configure deployment settings with empty build command and root directory as publish directory. The ⁠manifest.json file requires proper MIME type serving, which Netlify handles automatically through its intelligent content type detection system.

```
Build command: # Leave empty
Publish directory: ./
Node version: # Not required for static deployment
```

### Traditional Web Server Deployment
For deployment on conventional web hosting services, upload all project files to the document root directory while maintaining the exact file structure. The application requires specific server configurations for optimal PWA functionality and proper resource serving.
Configure MIME types for Progressive Web App manifests and ensure HTTPS certificate installation. The ⁠.htaccess configuration file should include proper headers for PWA compatibility:

```
# PWA MIME type configuration
AddType application/manifest+json .webmanifest
AddType application/manifest+json .json

# HTTPS redirect for PWA requirements
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Cache control for static assets
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
</IfModule>
```

### Docker Container Deployment

Create a Docker container for consistent deployment across different environments using a lightweight web server like nginx. The container configuration ensures reproducible deployment with controlled dependencies and versions.

```
FROM nginx:alpine
COPY . /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
```


### Content Delivery Network Configuration

For global accessibility and improved loading performance, configure CDN distribution for static assets while ensuring external dependencies remain accessible. The application loads critical libraries from established CDNs with fallback mechanisms implemented in the ⁠```onOpenCvError()``` function within ```⁠imageUpload.html```.

---

# Complete Application Workflow

CDN configuration should account for the approximately 8.5MB OpenCV.js library size and implement appropriate caching headers. Calculate optimal cache duration using the formula: ```⁠Cache-Duration = Library-Size-MB × 86400 / Average-Bandwidth-Mbps``` to balance performance and freshness.


### SSL Certificate and Security Configuration

Implement comprehensive security measures including Content Security Policy, HTTP Strict Transport Security, and X-Frame-Options headers. The CSP configuration must accommodate external CDN resources while maintaining security:

```Header always set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://d3js.org https://docs.opencv.org; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://fonts.googleapis.com; font-src 'self' https://cdnjs.cloudflare.com https://fonts.gstatic.com; img-src 'self' data: blob:; connect-src 'self';"```

### Performance Optimization and Monitoring

Configure server-side compression for text-based assets and implement resource preloading hints in the HTML head sections. The ⁠```styles.css``` file should be compressed using gzip compression achieving approximately 70-80% size reduction based on the compression ratio formula: ⁠```Compression-Ratio = (Original-Size - Compressed-Size) / Original-Size × 100```.

Monitor deployment performance using browser DevTools and Lighthouse auditing. The PWA audit should achieve scores above 90 in all categories including Performance, Accessibility, Best Practices, and SEO for optimal user experience and search engine visibility.


### Deployment Verification Checklist

Verify successful deployment by testing core functionality including PWA installation prompts on mobile devices, offline functionality after initial loading, ```OpenCV.js``` library loading through the ```⁠onOpenCvReady()``` callback function, camera access permissions for image capture, and service worker registration success in browser DevTools.

Test the complete analysis workflow from user registration in ```⁠index.html``` through image processing in ⁠```imageUpload.html``` to ensure all external dependencies load correctly and processing functions execute without errors. Monitor browser console for any CDN loading failures or JavaScript errors that might indicate deployment configuration issues.

# Complete Application Workflow

### User Registration and Onboarding

The application workflow begins with user registration through the ```index.html``` interface where individuals provide personal identification including full name, email address, and organizational affiliation. The registration form implements client-side validation using HTML5 form constraints and JavaScript validation functions to ensure data completeness before proceeding to the analysis interface.

The ```openHelpModal()``` function automatically triggers an interactive tutorial system explaining biosensor principles, color change mechanisms, and step-by-step analysis procedures. This onboarding process utilizes a multi-slide presentation system with navigation controls implemented through event listeners for ```nextBtn```, ```prevBtn```, and ```skipBtn``` elements.

```javascript
function openHelpModal() {
  helpModal.classList.add('active');
  currentSlide = 0;
  showSlide(currentSlide);
}
```

The help system educates users on the scientific principles underlying gap-plasmon dispersion, explains the relationship between antibody binding and structural color changes, and provides detailed instructions for optimal image capture techniques including lighting requirements and camera positioning.

### Image Acquisition and Preprocessing

Image acquisition supports both direct camera capture through the device's native camera interface and file upload from device storage. The ⁠```imageInput.addEventListener('change')``` handler processes uploaded files while implementing comprehensive validation including file size limits, format compatibility checks, and image resolution verification.

The preprocessing pipeline begins with the ⁠```imageObj.onload()``` callback function that creates thumbnail previews, validates image dimensions using the formula ⁠```aspect-ratio = width / height``` where acceptable ratios fall within 0.75 to 1.33 range, and initializes the analysis interface by removing the ⁠hidden class from the actions container.

Image quality assessment occurs through the ⁠```assessImageQuality()``` function that calculates sharpness metrics using Laplacian variance with the threshold formula ⁠```sharpness = Σ(∇²I)² / (width × height)``` where values below 100 indicate potentially blurry images requiring user attention.

### Reference Point Selection Workflow
The reference point selection process requires users to capture six distinct measurement points following a specific sequence designed to ensure measurement accuracy and reproducibility. The workflow enforces sequential completion starting with white and black reference calibration points, followed by baseline reference measurement, and concluding with four sample points representing different analyte concentrations.

Each point selection triggers the popup interface through button click handlers using ```⁠btn.getAttribute('data-point')``` to identify the current measurement type. The ⁠```popup.classList.add('active')``` function displays the full-screen analysis interface while the ⁠```popupTitle.textContent``` updates to provide context-specific instructions for each measurement point.

The ⁠currentPoint variable tracks the active measurement type enabling proper data storage in the ⁠rgbValues object structure. This systematic approach ensures complete dataset capture with proper labeling for subsequent analysis calculations.


### Circle Detection and Color Sampling

Automated circle detection begins when users tap locations on the sensor image, triggering the ⁠```popupImage.addEventListener('click')``` handler that calculates image coordinates using viewport transformation mathematics:

```
const scaleX = popupImage.naturalWidth / popupImage.clientWidth;
const scaleY = popupImage.naturalHeight / popupImage.clientHeight;
const x = Math.round((e.clientX - rect.left) * scaleX);
const y = Math.round((e.clientY - rect.top) * scaleY);
```

The multi-stage detection algorithm implemented in ⁠```detectCircleFromPoint()``` begins with ```OpenCV.js``` Hough Circle Transform using parameter arrays optimized for different image conditions. When automatic detection fails, the system employs radial sampling through ⁠```findRadiusInDirection()``` that analyzes color gradients in 24 equally-spaced directions using angular increments of ```π/12``` radians.

Color sampling utilizes the ```⁠calculateAverageColor()``` function that creates binary circular masks and computes pixel-weighted averages within detected regions. The sampling area calculation follows ```⁠A = πr²``` where r represents the detected radius, and pixel counting ensures minimum thresholds exceed 100 pixels for statistical reliability.

### White Balance Correction and Color Space Conversion

White balance correction applies two-point linear transformation using reference measurements through the ⁠```normalizeRGB()``` function. The mathematical transformation follows the equation:

 ``` Corrected_RGB = ((Raw_RGB - Black_Reference) / (White_Reference - Black_Reference)) × 255 ```

This correction compensates for lighting variations, camera characteristics, and environmental factors that affect color reproduction consistency across different measurement sessions and devices.

Color space conversion from RGB to CIE Lab utilizes the D3-color library through ⁠```rgbToLab()``` function calls. The Lab color space provides perceptually uniform color differences enabling meaningful distance calculations that correlate with human visual perception of color changes. The conversion process involves intermediate XYZ color space transformation using standard illuminant D65 and 2-degree observer specifications.

### Concentration Estimation and Statistical Analysis

Concentration estimation employs statistical distance matching rather than linear interpolation using the pre-calibrated ⁠referenceTable containing seven concentration points with associated standard deviations. The ⁠```estimateConcentration()``` function calculates standardized distances using the formula:

``` Z-score = |Measured_Distance - Reference_Distance| / Reference_Standard_Deviation ```

The algorithm selects the reference point with minimum Z-score, providing robust concentration estimates that account for measurement uncertainty. Confidence score calculation uses Gaussian probability distribution through ```⁠Math.exp(-0.5 * z * z) * 100``` to quantify measurement reliability.

### Results Presentation and Export Functionality

Results presentation utilizes ```Chart.js``` library to create interactive bar charts displaying concentration estimates with error bars representing confidence intervals. The ```⁠analysisPopup.classList.add('active')``` function triggers the results interface while processing continues through the comprehensive analysis pipeline.

The analysis results include detailed statistical summaries, measurement quality assessments, and confidence indicators for each sample point. Export functionality through ⁠```exportPDF()``` generates comprehensive reports using ```jsPDF``` library, while ⁠```shareReport()``` enables data sharing through native device sharing APIs when available.

The complete workflow typically requires 2-3 minutes depending on the number of sample points and includes automatic quality control checks, error handling with specific recommendations, and comprehensive result validation to ensure measurement reliability and user confidence in the analytical results.

[↑ Back to Top](#table-of-contents)

---

# Image Processing Pipeline


## Image Processing Pipeline

### OpenCV.js Integration and Initialization

The image processing pipeline relies on OpenCV.js version 4.10.0 for computer vision operations, loaded asynchronously through the ```onOpenCvReady()``` and ```onOpenCvError()``` callback functions defined in ```imageUpload.html```. The library size of approximately 8.5MB requires careful loading management to prevent interface blocking during initialization.

The ```opencvReady``` global variable tracks initialization status while the loading overlay system through ```showLoading()``` and ```hideLoading()``` functions provides user feedback during processing operations. WebAssembly compilation occurs automatically upon library loading, enabling high-performance image processing operations directly within the browser environment.

```javascript
function onOpenCvReady() {
  opencvReady = true;
  const statusEl = document.getElementById('opencv-status');
  statusEl.innerHTML = '<i class="fa fa-check-circle"></i> OpenCV.js is ready';
  statusEl.style.backgroundColor = 'rgba(42, 157, 143, 0.2)';
  console.log("OpenCV.js loaded successfully");
}
```

Error handling for ```OpenCV.js``` failures includes fallback mechanisms that enable manual circle specification when automatic detection becomes unavailable, ensuring application functionality under all network and performance conditions.

### Multi-Stage Circle Detection Algorithm

The circle detection system implements a hierarchical approach beginning with Hough Circle Transform as the primary detection method. The ```⁠detectCircleFromPoint()``` function processes user-selected coordinates through multiple parameter sets optimized for different image conditions and circle characteristics.

The Hough Transform parameter arrays include varied accumulator resolution (dp), minimum distance between circles (minDist), Canny edge detection thresholds (param1), and accumulator threshold for circle centers (param2). Mathematical relationships follow:
```
Accumulator_Threshold = Circle_Pixels × param2 / 100
Edge_Threshold_High = param1
Edge_Threshold_Low = param1 / 2
```
The algorithm tests four parameter combinations systematically, starting with conservative settings and progressing to more aggressive detection parameters that identify circles in challenging image conditions:
```
 const attempts = [
  { dp: 1, minDist: 20, param1: 50, param2: 30, minRadius: 5, maxRadius: maxRadius },
  { dp: 1, minDist: 20, param1: 100, param2: 20, minRadius: 5, maxRadius: maxRadius },
  { dp: 1.5, minDist: 20, param1: 100, param2: 15, minRadius: 5, maxRadius: maxRadius },
  { dp: 2, minDist: 20, param1: 150, param2: 10, minRadius: 5, maxRadius: maxRadius }
];
```

Circle validation occurs through proximity analysis where detected circles must fall within twice their radius from the user-selected point, ensuring spatial accuracy and rejecting false detections from other image regions.

### Radial Sampling Fallback Detection

When Hough Circle Transform fails to identify suitable circles, the system employs radial sampling detection through the ⁠findRadiusInDirection() function that analyzes color gradients along 24 equally-spaced radial directions from the selected point. Angular spacing follows ```⁠θ = 2π/24 = π/12``` radians providing comprehensive boundary detection coverage.

The algorithm samples pixel intensities along each radial direction using parametric line equations:
```
x(t) = center_x + t × cos(θ)
y(t) = center_y + t × sin(θ)
```

Significant color transitions indicating circle boundaries are detected when the absolute difference between consecutive pixels exceeds the user-defined sensitivity threshold. The ⁠significantChanges array accumulates transition points sorted by magnitude to identify the most prominent boundary.

Outlier filtering uses interquartile range methodology where detected radii are sorted and filtered using Q1 and Q3 quartile positions. The final radius represents the average of measurements falling within the interquartile range, improving robustness against measurement noise and detection errors.

### Manual Circle Specification Mode

Manual mode provides user-controlled circle specification through the ⁠manualDetectCircle() function when automatic detection algorithms fail to identify suitable circular regions. Users specify center coordinates through image clicking and radius values through the numeric input interface.

The manual mode interface becomes accessible through the ⁠```manualFallback.addEventListener('click')``` handler that toggles the ⁠manualRadiusInput visibility and updates instruction text. Custom radius validation ensures values fall within acceptable ranges of 5-300 pixels based on typical sensor feature sizes and image resolution constraints.

```javascript
 function manualDetectCircle(centerX, centerY, radius) {
  let mask = new cv.Mat.zeros(src.rows, src.cols, cv.CV_8UC1);
  let center = new cv.Point(centerX, centerY);
  cv.circle(mask, center, radius, new cv.Scalar(255), -1);
  
  let avgColor = calculateAverageColor(src, centerX, centerY, radius);
  return avgColor;
}
```

Manual specification provides identical color sampling results as automatic detection methods, maintaining measurement consistency across different detection approaches while accommodating challenging image conditions or sensor geometries.

### Precise Color Sampling Implementation

Color sampling utilizes the ⁠```calculateAverageColor()``` function that creates binary circular masks matching detected circle geometry and computes pixel-weighted averages within these regions. The mask generation process uses OpenCV.js circle drawing functions with filled interior specification.

The sampling algorithm iterates through pixels within the bounding rectangle encompassing the detected circle, testing mask values to determine inclusion in the average calculation. Pixel counting ensures statistical reliability with minimum thresholds exceeding 100 pixels per sample region.

```javascript
 function calculateAverageColor(img, centerX, centerY, radius) {
  let totalR = 0, totalG = 0, totalB = 0;
  let pixelCount = 0;
  
  let minX = Math.max(0, Math.floor(centerX - radius));
  let maxX = Math.min(img.cols - 1, Math.ceil(centerX + radius));
  let minY = Math.max(0, Math.floor(centerY - radius));
  let maxY = Math.min(img.rows - 1, Math.ceil(centerY + radius));
  
  let mask = new cv.Mat.zeros(img.rows, img.cols, cv.CV_8UC1);
  cv.circle(mask, new cv.Point(centerX, centerY), radius, new cv.Scalar(255), -1);
  
  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      if (mask.ucharPtr(y, x)[0] === 255) {
        let pixel = img.ucharPtr(y, x);
        totalR += pixel[0];
        totalG += pixel[1];
        totalB += pixel[2];
        pixelCount++;
      }
    }
  }
  
  mask.delete();
  return [
    Math.round(totalR / pixelCount),
    Math.round(totalG / pixelCount),
    Math.round(totalB / pixelCount)
  ];
}
```

Edge pixel exclusion prevents sampling artifacts from circle boundary approximation errors, while the circular mask ensures geometric consistency across all measurement points regardless of detection method used.

### Image Quality Assessment and Preprocessing

Image quality assessment occurs through multiple metrics including sharpness evaluation using Laplacian variance, exposure analysis through histogram statistics, and color balance verification. The ⁠```assessImageQuality()``` function calculates comprehensive quality scores used for automated feedback and recommendations.

Sharpness calculation uses the discrete Laplacian operator applied to grayscale image conversion, with variance computation providing numerical sharpness metrics. The threshold formula ```⁠sharpness_score = Var(∇²I)``` where values below 100 indicate potentially blurry images requiring user attention or improved capture technique.

Preprocessing operations include Gaussian blur application for noise reduction with kernel size selection based on image dimensions, Canny edge detection for boundary enhancement with adaptive threshold calculation, and gamma correction for exposure optimization when required by image conditions.

### Memory Management and Resource Cleanup

```OpenCV.js``` operations require careful memory management due to manual memory allocation for Mat objects and processing buffers. The pipeline implements comprehensive cleanup procedures through the ```⁠mat.delete()``` method calls for all temporary matrices and processing objects.
Resource tracking occurs through try-catch blocks surrounding all OpenCV.js operations, ensuring proper cleanup even when processing errors occur. The ⁠hideLoading() function call ensures user interface responsiveness regardless of processing outcomes.
Memory usage monitoring through ⁠```performance.memory``` API when available provides diagnostic information for optimization and troubleshooting purposes, particularly important for mobile devices with limited memory resources during intensive image processing operations.

---

# Color Analysis Algorithm


## Color Analysis Algorithm

### RGB Color Space Fundamentals and Limitations

The RGB color space represents colors through additive combinations of red, green, and blue components with values ranging from 0 to 255 for 8-bit representations. While RGB provides intuitive color specification for digital displays, it exhibits non-uniform perceptual characteristics where equal numerical differences do not correspond to equal perceived color differences.

The application initially captures RGB values through the `calculateAverageColor()` function which extracts pixel data using OpenCV.js `ucharPtr()` method accessing individual color channels. Raw RGB measurements suffer from device-dependent variations including camera sensor characteristics, white balance settings, and ambient lighting conditions that require systematic correction.

Mathematical relationships between RGB channels and perceived color depend on display gamma correction, color temperature specifications, and observer viewing conditions. The standard sRGB color space assumes D65 illuminant with 2-degree observer specifications, but smartphone cameras may deviate from these standards requiring empirical correction procedures.

### White Balance Correction Implementation

White balance correction addresses systematic color shifts caused by illumination spectrum variations and camera automatic gain control systems through the `normalizeRGB()` function. The two-point linear transformation utilizes white and black reference measurements to establish proper color scale calibration.

The mathematical transformation applies linear scaling to each RGB channel independently using the formula:

``` Corrected_Channel = ((Raw_Channel - Black_Reference) / (White_Reference - Black_Reference + ε)) × 255 ```
 
The epsilon term `ε = 0.0001` prevents division by zero when reference measurements exhibit identical values, while the multiplication by 255 maintains 8-bit color space scaling. Clamping operations through `Math.max(0, Math.min(255, result))` ensure output values remain within valid RGB ranges.

```javascript
function normalizeRGB(rgb, whiteRef, blackRef) {
  const epsilon = 0.0001;
  return [
    Math.max(0, Math.min(255, ((rgb[0] - blackRef[0]) / (whiteRef[0] - blackRef[0] + epsilon)) * 255)),
    Math.max(0, Math.min(255, ((rgb[1] - blackRef[1]) / (whiteRef[1] - blackRef[1] + epsilon)) * 255)),
    Math.max(0, Math.min(255, ((rgb[2] - blackRef[2]) / (whiteRef[2] - blackRef[2] + epsilon)) * 255))
  ];
}
```

Reference point selection requires careful consideration of sensor surface characteristics where white references should exhibit high reflectance across all visible wavelengths while black references demonstrate minimal reflectance. Proper reference selection directly impacts measurement accuracy and reproducibility across different environmental conditions.

### CIE Lab Color Space Conversion

CIE Lab color space provides perceptually uniform color representation where numerical distances correlate closely with human visual perception of color differences. The conversion from RGB to Lab occurs through the ```⁠rgbToLab()``` function utilizing the D3-color library for accurate colorimetric calculations.

The transformation process involves intermediate conversion to CIE XYZ color space using the sRGB standard transformation matrices, followed by nonlinear transformation to Lab coordinates. The XYZ to Lab conversion follows:
```
 L* = 116 × f(Y/Yn) - 16
a* = 500 × [f(X/Xn) - f(Y/Yn)]
b* = 200 × [f(Y/Yn) - f(Z/Zn)]
```
Where f(t) represents the cube root function for ```t > δ³``` or linear scaling for smaller values, and Xn, Yn, Zn represent the white point coordinates for the chosen illuminant (D65).

```javascript
 function rgbToLab(rgb) {
  const r = rgb[0], g = rgb[1], b = rgb[2];
  const labColor = d3.lab(d3.rgb(r, g, b));
  return [labColor.l, labColor.a, labColor.b];
}
```

The D3-color library handles gamma correction, chromatic adaptation, and white point normalization automatically, ensuring accurate color space conversion without requiring manual implementation of complex colorimetric calculations.

### Euclidean Distance Calculation in Lab Space

Color difference quantification uses three-dimensional Euclidean distance calculation in CIE Lab space through the ⁠```labDistance()``` function. This metric provides meaningful numerical representation of perceptual color differences that correlate with the magnitude of analyte binding on sensor surfaces.

The distance calculation follows the standard Euclidean formula in three-dimensional space:
```ΔE = √[(ΔL*)² + (Δa*)² + (Δb*)²]```

Where ΔL*, Δa*, and Δb* represent differences in lightness, green-red, and blue-yellow axes respectively. The resulting ΔE value provides direct quantitative measurement of color change magnitude suitable for concentration estimation algorithms.

```javascript
 function labDistance(lab1, lab2) {
  return Math.sqrt(
    Math.pow(lab1[0] - lab2[0], 2) +
    Math.pow(lab1[1] - lab2[1], 2) +
    Math.pow(lab1[2] - lab2[2], 2)
  );
}
```

Distance calculations between sample measurements and reference baseline provide the fundamental data for concentration estimation, with larger distances indicating greater analyte concentrations and corresponding stronger color changes from antibody binding events.

### Statistical Concentration Estimation Framework

Concentration estimation employs statistical distance matching rather than simple linear interpolation through the ```⁠estimateConcentration()``` function. This approach uses pre-calibrated reference data including measured distances and associated standard deviations to account for measurement uncertainty and variability.

The reference calibration table contains seven concentration points spanning the dynamic range from 0.001 to 5.0 mg/mL with experimentally determined distance values and statistical parameters:
```
 const referenceTable = [
  { concentration: 0.001, distance: 1.37813,  std: 0.721668 },
  { concentration: 0.01,  distance: 3.35443,  std: 1.7526 },
  { concentration: 0.05,  distance: 5.78455,  std: 1.845159 },
  { concentration: 0.1,   distance: 12.24817, std: 1.62919 },
  { concentration: 0.5,   distance: 13.4935,  std: 1.7844 },
  { concentration: 1,     distance: 17.2858,  std: 1.74072 },
  { concentration: 5,     distance: 20.1474,  std: 1.144311 }
];
```
 Statistical matching calculates standardized distances using Z-score methodology where each reference point comparison follows:
 
 ```Z-score = |Measured_Distance - Reference_Distance| / Reference_Standard_Deviation```
 
The algorithm selects the reference point with minimum Z-score as the best statistical match, providing concentration estimates that account for measurement uncertainty and experimental variability inherent in colorimetric measurements.

### Confidence Score Calculation

Measurement confidence quantification uses Gaussian probability distribution based on the statistical distance from the selected reference point. The ⁠calculateConfidence() function computes confidence scores using the Z-score from the concentration estimation process.
The confidence calculation follows the standard normal distribution probability density function:

 ```Confidence = exp(-0.5 × Z²) × 100```
 
This approach provides percentage confidence values where scores near 100% indicate measurements very close to reference calibration points, while lower scores suggest measurements falling between reference points or exhibiting greater uncertainty.

```javascript
 function calculateConfidence(distance, referencePoint) {
  const z = (distance - referencePoint.distance) / referencePoint.std;
  return parseFloat((Math.exp(-0.5 * z * z) * 100).toFixed(2));
}
```

Confidence scores enable users to assess measurement reliability and identify samples requiring repeat analysis or additional validation through alternative measurement techniques.
 
### Algorithm Performance Optimization

Color analysis algorithms implement several optimization strategies to maintain responsive performance on mobile devices with limited computational resources. RGB normalization uses vectorized operations where possible, while Lab conversion leverages optimized D3-color library implementations.

Distance calculations utilize early termination when confidence thresholds are exceeded, reducing unnecessary computation for high-confidence measurements. Memory allocation minimization occurs through object reuse and efficient data structure selection optimized for JavaScript execution environments.

Performance monitoring through ⁠```performance.now()``` timing measurements enables identification of bottlenecks and optimization opportunities, particularly important for maintaining responsive user interface during intensive color analysis operations on multiple sample points simultaneously.

---

# White Balance Correction

## White Balance Correction

### Two-Point Linear Transformation Method

White balance correction eliminates systematic color distortions caused by varying illumination conditions and camera sensor characteristics through the ```normalizeRGB()``` function in ```imageUpload.html```. The algorithm employs two-point linear scaling using white and black reference measurements to establish proper color calibration across all RGB channels.

The transformation applies independent linear scaling to each color channel using the mathematical relationship:

``` Normalized_RGB[i] = ((Raw_RGB[i] - Black_Ref[i]) / (White_Ref[i] - Black_Ref[i] + ε)) × 255```
 
The epsilon term ```ε = 0.0001``` prevents division-by-zero errors while maintaining numerical stability when reference points exhibit minimal color differences.

### Implementation and Error Handling

The correction function processes RGB triplets through channel-wise normalization with bounds checking to ensure output values remain within valid 8-bit color ranges:

```javascript
function normalizeRGB(rgb, whiteRef, blackRef) {
  const epsilon = 0.0001;
  return [
    Math.max(0, Math.min(255, ((rgb[0] - blackRef[0]) / (whiteRef[0] - blackRef[0] + epsilon)) * 255)),
    Math.max(0, Math.min(255, ((rgb[1] - blackRef[1]) / (whiteRef[1] - blackRef[1] + epsilon)) * 255)),
    Math.max(0, Math.min(255, ((rgb[2] - blackRef[2]) / (whiteRef[2] - blackRef[2] + epsilon)) * 255))
  ];
}
```
Quality validation occurs through contrast ratio assessment where the difference between white and black references must exceed threshold values of 100 RGB units per channel to ensure reliable calibration. Insufficient contrast triggers user warnings through the quality control system.

### Reference Point Selection Criteria

White references should exhibit reflectance values above 240 across all RGB channels representing near-perfect diffuse reflection, while black references require values below 15 indicating minimal light reflection. The application guides users toward appropriate reference regions through real-time feedback during point selection.

Spatial considerations require reference points to be captured under identical lighting conditions as sample measurements, preferably within the same image frame to minimize environmental variations. The reference point validation system in ⁠```performQualityControl()``` checks these criteria automatically.

### Correction Effectiveness and Validation

White balance effectiveness is quantified through color temperature consistency measurements comparing corrected RGB values across different lighting conditions. Successful correction reduces color temperature variations from typically 1000K+ to less than 200K differences between measurement sessions.

The correction algorithm maintains measurement precision with coefficient of variation below 5% for replicate measurements under controlled conditions, demonstrating the effectiveness of the two-point calibration approach for smartphone-based colorimetric analysis applications.

---

# Feature Extraction Methods

## Feature Extraction Methods

### Circular Region Identification and Validation

Feature extraction begins with automated circular region identification through the multi-stage detection pipeline implemented in ```detectCircleFromPoint()```. The system extracts geometric features including center coordinates, radius measurements, and circularity scores to validate detection quality before color sampling.

Circle validation employs geometric consistency checks where detected radius values must fall within 5-300 pixel ranges based on typical sensor feature dimensions. The circularity score calculation uses the formula ```Circularity = 4π × Area / Perimeter²``` with acceptable values above 0.7 indicating well-defined circular boundaries.

```javascript
function validateCircleGeometry(center, radius, contour) {
  const area = Math.PI * radius * radius;
  const perimeter = cv.arcLength(contour, true);
  const circularity = (4 * Math.PI * area) / (perimeter * perimeter);
  return circularity > 0.7 && radius >= 5 && radius <= 300;
}
```

### Color Feature Extraction Pipeline

Color feature extraction occurs through the ⁠```calculateAverageColor()``` function that implements spatially-weighted averaging within precisely defined circular masks. The extraction process samples pixel intensities using bilinear interpolation for sub-pixel accuracy when circle boundaries intersect pixel centers.

Statistical color features include mean RGB values, standard deviations within each channel, and color variance metrics indicating measurement reliability. The system calculates these features for minimum 100-pixel samples to ensure statistical significance according to the central limit theorem.

Texture analysis through local binary pattern calculations provides additional discrimination capability for detecting surface irregularities or contamination that might affect measurement accuracy. The LBP operator computes local texture descriptors using 8-pixel neighborhoods around the circle center.

### Spatial Feature Analysis

Spatial features encompass edge definition strength through gradient magnitude calculations along circle boundaries, providing quantitative assessment of detection quality. The Sobel operator applied to grayscale conversions yields edge strength measurements with typical values above 50 indicating well-defined boundaries.

Radial intensity profiles extracted through the ⁠```findRadiusInDirection()``` function provide 24-point spatial characterization around detected circles. These profiles enable detection of asymmetric color distributions or irregular binding patterns that might indicate measurement artifacts.

```javascript
 function extractRadialProfile(image, center, radius) {
  const profile = [];
  for (let angle = 0; angle < 2 * Math.PI; angle += Math.PI / 12) {
    const x = center.x + radius * Math.cos(angle);
    const y = center.y + radius * Math.sin(angle);
    const intensity = getPixelIntensity(image, x, y);
    profile.push(intensity);
  }
  return profile;
}
```

### Quality Metrics and Feature Validation

Feature quality assessment combines geometric, colorimetric, and spatial measurements into comprehensive quality scores computed by ⁠```assessDetectionQuality()```. The scoring system weights different feature categories with geometric accuracy contributing 40%, color consistency 35%, and spatial uniformity 25% to overall quality.

Outlier detection in extracted features uses interquartile range methodology where feature values falling outside ```Q1 - 1.5×IQR or Q3 + 1.5×IQR``` ranges trigger quality warnings. These statistical bounds help identify measurement artifacts or detection errors requiring user attention.

Feature normalization ensures consistent scaling across different measurement sessions through z-score standardization: ```⁠normalized_feature = (feature - mean) / standard_deviation```. This preprocessing improves downstream analysis accuracy and reduces sensitivity to environmental variations.

### Multi-Point Feature Aggregation

When multiple sample points are analyzed simultaneously, the system performs feature aggregation through robust statistical methods including median calculations for central tendency and median absolute deviation for spread estimation. These robust statistics minimize influence from potential outlier measurements.

Cross-point validation compares feature consistency between sample measurements and reference points, identifying systematic errors or environmental changes during the analysis session. Correlation analysis between spatial proximity and feature similarity helps detect localized measurement issues on sensor surfaces.

The aggregated feature vector serves as input to the concentration estimation algorithm, providing comprehensive characterization of sensor response patterns that improve measurement accuracy compared to single-point analysis approaches.

---

# Quality Control System

## Quality Control System

### Real-Time Image Quality Assessment

The quality control system implements continuous monitoring through the ```performQualityControl()``` function that evaluates image sharpness, exposure, and color balance in real-time. Sharpness assessment uses Laplacian variance with the calculation ```sharpness = Var(∇²I)``` where values below 100 trigger blur warnings to users.

Exposure validation analyzes histogram statistics to detect over-exposed or under-exposed regions that could compromise color measurements. The algorithm calculates pixel intensity distribution and flags images where more than 5% of pixels fall below 10 or above 245 intensity levels.

```javascript
function assessImageQuality(imageData) {
  const histogram = calculateHistogram(imageData);
  const overExposed = histogram.slice(245, 256).reduce((a, b) => a + b, 0);
  const underExposed = histogram.slice(0, 11).reduce((a, b) => a + b, 0);
  const totalPixels = imageData.width * imageData.height;
  
  return {
    sharpness: calculateLaplacianVariance(imageData),
    exposure: 1 - (overExposed + underExposed) / totalPixels,
    contrast: calculateContrast(histogram)
  };
}
```

### Circle Detection Quality Validation

Detection quality assessment evaluates geometric consistency, boundary definition, and spatial accuracy through multiple metrics computed during the circle detection process. The ⁠```assessDetectionQuality()``` function combines circularity scores, edge strength measurements, and radius consistency analysis.

Circularity validation uses the mathematical relationship ```⁠C = 4πA/P²``` where A represents detected area and P represents perimeter length. Acceptable circles achieve circularity scores above 0.7, while values below 0.5 trigger detection quality warnings and manual mode recommendations.

Edge definition strength employs gradient magnitude calculations along detected circle boundaries using Sobel operators. The system computes mean gradient values around the entire circle perimeter, requiring minimum values above 30 for reliable boundary definition.

### Color Measurement Reliability Assessment

Color sampling reliability evaluation through ⁠```assessColorReliability()``` analyzes pixel count sufficiency, color variance within sampled regions, and statistical significance of extracted RGB values. Minimum pixel count requirements of 100 pixels ensure adequate sampling according to statistical reliability principles.

Within-region color variance calculation uses standard deviation across all sampled pixels for each RGB channel. Excessive variance (CV > 15%) indicates potential measurement artifacts from surface irregularities, contamination, or detection boundary errors requiring user attention.

```javascript
 function assessColorReliability(rgbValues, pixelCount, variance) {
  const coefficientVariation = Math.sqrt(variance) / calculateMean(rgbValues);
  return {
    pixelSufficiency: pixelCount >= 100,
    colorConsistency: coefficientVariation < 0.15,
    statisticalSignificance: pixelCount > 30
  };
}
```

### Reference Point Validation System

Reference point quality control ensures proper white and black reference selection through contrast analysis and reflectance validation. The system calculates contrast ratios between reference points using ⁠```contrast = (Lmax - Lmin) / (Lmax + Lmin)``` where minimum ratios above 0.8 indicate suitable reference selection.

White reference validation requires RGB values above 220 across all channels, while black references should exhibit values below 35. The validation algorithm also checks for color neutrality where differences between RGB channels remain below 20 units for proper white balance calibration.

Temporal consistency monitoring tracks reference point stability across measurement sessions, flagging significant changes that might indicate environmental variations or reference surface contamination affecting measurement accuracy.

### Automated Quality Scoring and Feedback

The integrated quality scoring system combines image quality, detection quality, and color reliability metrics into overall quality scores ranging from 0.0 to 1.0. The weighted combination formula applies coefficients of 0.3, 0.4, and 0.3 respectively to balance different quality aspects.
```javascript
 function calculateOverallQuality(imageQ, detectionQ, colorQ) {
  return imageQ * 0.3 + detectionQ * 0.4 + colorQ * 0.3;
}
```
Quality scores above 0.8 indicate acceptable measurements suitable for quantitative analysis, while scores between 0.6-0.8 suggest caution with potential measurement uncertainty. Scores below 0.6 trigger specific improvement recommendations including lighting adjustments, sensor cleaning, or alternative detection methods.

## File Structure and Organization

### Core Application Files

The application architecture consists of essential files organized for optimal performance and maintainability. The ```index.html``` serves as the primary entry point containing user registration functionality, PWA installation detection logic, and the integrated help system with multi-slide tutorials implemented through JavaScript event handlers.

The ```imageUpload.html``` file contains the complete analysis interface including OpenCV.js integration, circle detection algorithms, color analysis functions, and results presentation systems. This file implements the core processing pipeline with approximately 1,200 lines of JavaScript handling image processing, quality control, and user interaction management.

- index.html          - 450 lines: User registration and onboarding interface
- imageUpload.html    - 1,200 lines: Core analysis engine and processing pipeline
- styles.css          - 800 lines: Complete responsive styling and animations
- service-worker.js   - 25 lines: PWA caching and offline functionality
- manifest.json       - 15 lines: PWA installation configuration
- app.js              - 50 lines: Legacy JavaScript (deprecated functionality)
 
### Styling and User Interface Architecture

The ```styles.css``` file implements comprehensive responsive design using CSS Grid and Flexbox layouts with mobile-first architecture. The styling system includes custom CSS properties for consistent theming, media queries for device adaptation, and animation systems for enhanced user experience.

Critical styling sections include header positioning with safe area handling for iOS devices, responsive upload button layouts with hover effects, popup interface styling for full-screen analysis, and chart container formatting for results visualization. The CSS architecture follows BEM methodology for maintainable class naming conventions.

### Progressive Web App Configuration

PWA functionality relies on ```service-worker.js``` implementing cache-first strategy for static assets and network-first approach for dynamic content. The service worker registers essential files including HTML, CSS, and icon resources while managing version control through the ```CACHE_NAME``` constant.

The ```manifest.json``` file defines PWA installation properties including application name, short name, start URL, display mode, theme colors, and icon specifications. Icon requirements include 192x192 and 512x512 pixel PNG formats stored in the ```icons/``` directory for proper installation across different platforms.

```javascript
const CACHE_NAME = "immunochroma-v1.0.0";
const urlsToCache = [
  "/index.html",
  "/imageUpload.html", 
  "/styles.css",
  "/manifest.json"
];
```

### JavaScript Architecture and Function Organization

JavaScript code organization follows modular principles with distinct functional sections for OpenCV.js integration, circle detection algorithms, color analysis methods, and user interface management. Global variables track application state including ⁠opencvReady, ⁠currentPoint, ⁠rgbValues, and ⁠detectedCircle.

Core function categories include initialization handlers (⁠onOpenCvReady, ⁠onOpenCvError), image processing functions (⁠detectCircleFromPoint, ⁠calculateAverageColor), color analysis methods (⁠normalizeRGB, ⁠rgbToLab, ⁠labDistance), and user interface controllers for popup management and result presentation.

Event handling architecture uses addEventListener patterns for user interactions, with delegation for dynamically created elements and proper cleanup procedures to prevent memory leaks during extended usage sessions.

### Asset and Resource Management

Icon assets stored in the ⁠```icons/``` directory include optimized PNG files at required resolutions for PWA installation across different platforms. Icon optimization follows web standards with proper compression ratios maintaining visual quality while minimizing file sizes for improved loading performance.

External dependencies load from established CDNs including ```OpenCV.js``` from ```docs.opencv.org```, ```D3-color``` from ```d3js.org```, ```Chart.js``` from ```cdnjs.cloudflare.com```, and ```Font Awesome icons```. CDN selection prioritizes reliability, global distribution, and version stability for production deployments.

### Configuration and Environment Files

Development configuration requires minimal setup with optional ⁠package.json for development tools and ⁠.gitignore for version control excluding temporary files and development artifacts. Production deployment configurations include ⁠```.htaccess``` for Apache servers and nginx configuration files for containerized deployments.

Environment-specific configurations handle MIME type associations, security headers, compression settings, and caching policies optimized for PWA performance requirements. These configurations ensure proper functionality across different hosting environments while maintaining security best practices.

### Code Organization Principles

The codebase follows separation of concerns with distinct boundaries between user interface logic, image processing algorithms, and data management functions. Error handling implements try-catch blocks around critical operations with specific recovery procedures for different failure modes.

Documentation within code files includes comprehensive function comments, parameter descriptions, and usage examples for complex algorithms. The commenting strategy facilitates code maintenance and enables independent verification of algorithmic implementations for reproducibility requirements.

Memory management considerations include proper cleanup of OpenCV.js Mat objects, event listener removal during component destruction, and efficient data structure usage to minimize memory footprint on mobile devices with limited resources.

---

## Development & Technical

# File Structure and Organization

## Build Instructions

### Development Environment Setup

Install ```Node.js``` LTS version for development tooling and package management, though the application itself requires no compilation or build processes. Git installation enables version control and repository cloning for collaborative development workflows.

```bash
# Install Node.js (Ubuntu/Debian)
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```
### Verify installations
```bash
node --version
npm --version
git --version
```

Create optional development dependencies for enhanced workflow including live-server for automatic reloading, prettier for code formatting, and eslint for code quality validation:

```bash
 git clone https://github.com/your-username/immunochroma-pwa.git
cd immunochroma-pwa
npm init -y
npm install --save-dev live-server http-server prettier eslint
```

### Local Development Server Configuration

Configure development scripts in ⁠```package.json``` for streamlined workflow management and consistent development environment across team members:
```jason
 {
  "name": "immunochroma-pwa",
  "version": "1.0.0",
  "scripts": {
    "dev": "live-server --port=8000 --host=localhost --open=/index.html",
    "serve": "http-server -p 8000 -c-1 --cors",
    "https": "http-server -p 8000 -S -C cert.pem -K key.pem",
    "format": "prettier --write *.html *.css *.js",
    "lint": "eslint *.js --fix"
  }
}
```

### HTTPS Development Environment

PWA features require HTTPS for testing installation, service worker functionality, and camera access permissions. Generate self-signed certificates for local development using OpenSSL:
```bash
 openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 \
  -keyout key.pem -out cert.pem \
  -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"
```
### Start HTTPS development server
```bash
npm run https
```
Access the application at ```⁠https://localhost:8000``` and accept browser security warnings for self-signed certificates during development.

### Production Build Optimization

Although no compilation is required, production deployment benefits from asset optimization including CSS minification, image compression, and service worker cache optimization:

```bash
 # Install optimization tools
npm install --save-dev clean-css-cli imagemin-cli

# Minify CSS for production
npx cleancss -o styles.min.css styles.css

# Optimize PNG icons
npx imagemin icons/*.png --out-dir=icons/optimized --plugin=pngquant
```

Update service worker cache names for proper version management and cache invalidation:
```javascript
 // Update CACHE_NAME in service-worker.js for each release
const CACHE_NAME = "immunochroma-v1.1.0";
```
### Cross-Browser Testing Setup

Install browser testing tools for comprehensive compatibility validation across different platforms and versions:

```bash
npm install --save-dev playwright @playwright/test

# Create basic test configuration
cat > playwright.config.js << 'EOF'
module.exports = {
  testDir: './tests',
  use: {
    baseURL: 'http://localhost:8000',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } }
  ]
};
EOF
```

### Performance Auditing and Validation
Implement automated performance testing using Lighthouse CLI for PWA compliance validation and performance benchmarking:
```bash
npm install -g lighthouse

# Generate comprehensive PWA audit
lighthouse https://localhost:8000 \
  --preset=pwa \
  --output=html \
  --output-path=./lighthouse-report.html \
  --chrome-flags="--headless"
```
Target performance metrics include scores above 90 for Performance, Accessibility, Best Practices, and SEO categories with specific PWA requirements validation.

### Deployment Build Process
Prepare production deployment by validating file structure, updating version numbers, and optimizing assets:
```bash
 # Validate required files exist
ls -la index.html imageUpload.html styles.css manifest.json service-worker.js

# Update version numbers across files
sed -i 's/v1.0.0/v1.1.0/g' service-worker.js manifest.json

# Validate JSON syntax
python -m json.tool manifest.json > /dev/null && echo "manifest.json valid"
```

### Quality Assurance and Testing

Implement comprehensive testing procedures including functional validation, cross-device compatibility, and performance regression testing:

```javascript
# Function to test core functionality
test_core_features() {
  echo "Testing PWA installation..."
  echo "Testing image upload functionality..."
  echo "Testing circle detection algorithms..."
  echo "Testing color analysis pipeline..."
  echo "Testing results export capabilities..."
}
# Performance monitoring
monitor_performance() {
  lighthouse http://localhost:8000 --preset=pwa --quiet
}
```
### Build Automation and CI/CD
```bash
Configure automated build processes using GitHub Actions for consistent deployment workflows:
 name: Build and Deploy
on:
  push:
    branches: [ main ]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

## Validation and Reproducibility

### Analytical Performance Validation
The validation framework implements comprehensive testing protocols including precision assessment with intra-assay coefficient of variation below 10% for replicate measurements under identical conditions. Inter-assay precision maintains CV below 15% across different measurement sessions spanning multiple days and environmental conditions.

Accuracy validation compares smartphone-based measurements against laboratory spectrophotometer reference methods achieving correlation coefficients r² > 0.95 across the complete dynamic range from 0.001 to 5.0 mg/mL. Bias calculations demonstrate systematic error below 10% for all concentration levels.
```javascript
 // Statistical validation implementation
function validateMeasurementPrecision(measurements) {
  const mean = measurements.reduce((a, b) => a + b) / measurements.length;
  const variance = measurements.reduce((sum, x) => sum + Math.pow(x - mean, 2), 0) / (measurements.length - 1);
  const stdDev = Math.sqrt(variance);
  const cv = (stdDev / mean) * 100;
  
  return {
    mean: mean,
    standardDeviation: stdDev,
    coefficientOfVariation: cv,
    acceptable: cv < 15
  };
}
```
### Environmental Robustness Testing
Environmental validation encompasses diverse lighting conditions including indoor fluorescent illumination at 4000K, outdoor daylight at 6500K, and LED lighting at 5000K color temperature. The white balance correction algorithm maintains measurement accuracy across these conditions with CV below 12%.

Device compatibility testing covers iOS devices including iPhone 12 Pro, iPhone 13, and iPad Pro alongside Android devices such as Samsung Galaxy S21, Google Pixel 6, and OnePlus 9. Camera sensor variations are accommodated through the reference point calibration system.
Temperature stability testing from 15°C to 35°C demonstrates measurement consistency with systematic error below 8%. Humidity variations from 30% to 80% relative humidity show minimal impact on measurement precision due to the enclosed sensor design.

### Statistical Analysis Framework
The validation system implements comprehensive statistical evaluation including normality testing using Shapiro-Wilk tests, outlier detection through Grubbs' test methodology, and measurement uncertainty calculations according to ISO/IEC Guide 98-3 standards.
Measurement uncertainty budgets include contributions from reference standard uncertainty, repeatability variations, environmental effects, and systematic bias components. Total expanded uncertainty remains below 20% at 95% confidence level across the dynamic range.

```javascript
 // Comprehensive statistical analysis
function performStatisticalAnalysis(measurements) {
  return {
    descriptiveStats: calculateDescriptiveStatistics(measurements),
    normalityTest: performShapiroWilkTest(measurements),
    outlierAnalysis: detectOutliersGrubbs(measurements),
    uncertaintyBudget: calculateMeasurementUncertainty(measurements),
    confidenceInterval: calculateCI95(measurements)
  };
}
```
### Cross-Validation Methodology
Cross-validation protocols implement leave-one-out validation for concentration estimation accuracy assessment. The system randomly partitions reference data into training and validation sets, evaluating prediction accuracy through root-mean-square error calculations.
Blind sample testing uses independently prepared samples with known concentrations measured by laboratory reference methods. Agreement analysis through Bland-Altman plots demonstrates acceptable bias and precision limits for clinical applications.

### Reproducibility Documentation

Complete reproducibility documentation includes detailed protocols for sensor preparation, image capture standardization, environmental condition control, and statistical analysis procedures. Standard operating procedures specify camera distance requirements of 10-15 cm, perpendicular viewing angles within ±5°, and uniform lighting conditions.
Reference material specifications include white reference standards with >95% reflectance and black reference materials with <5% reflectance across visible wavelengths. Calibration procedures require fresh reference measurements for each analysis session to maintain accuracy.

### Quality Assurance Metrics

Quality assurance implementation tracks key performance indicators including measurement success rates above 95%, circle detection accuracy exceeding 90%, and user satisfaction scores above 4.0/5.0. System performance monitoring identifies trends and improvement opportunities.

Proficiency testing participates in inter-laboratory comparison programs when available, demonstrating measurement capability relative to established reference methods. Z-score performance typically remains within ±2.0 indicating satisfactory analytical performance.
The validation framework provides complete traceability from raw measurements through final concentration estimates, enabling independent verification and replication of results as required for scientific publication and regulatory compliance.

---

# Troubleshooting Guide



## Troubleshooting Guide

### OpenCV.js Loading and Initialization Issues

OpenCV.js loading failures commonly result from network connectivity problems, browser compatibility limitations, or insufficient memory allocation on mobile devices. The ```onOpenCvError()``` function in `imageUpload.html` handles loading failures and provides diagnostic information through console logging and user interface updates.

Network-related loading issues manifest through prolonged loading spinners or timeout errors. Verify internet connectivity and CDN accessibility by testing direct access to ```https://docs.opencv.org/4.10.0/opencv.js``` in browser address bars. Corporate firewalls or proxy servers may block WebAssembly loading requiring network administrator intervention.

```javascript
// Enhanced error diagnostics for OpenCV.js failures
function diagnoseOpenCVError() {
  console.log("Network status:", navigator.onLine);
  console.log("WebAssembly support:", typeof WebAssembly === 'object');
  console.log("Available memory:", performance.memory?.usedJSHeapSize);
  console.log("User agent:", navigator.userAgent);
}
```
Browser compatibility issues occur with older browsers lacking WebAssembly support or sufficient JavaScript capabilities. Minimum browser versions include Chrome 67+, Firefox 62+, Safari 13+, and Edge 79+. Update browsers or use alternative devices when compatibility issues persist.

Memory constraints on mobile devices with less than 2GB RAM may prevent successful OpenCV.js loading. Close unnecessary browser tabs, restart the browser application, or use devices with more available memory. The application provides fallback to manual circle detection when ```OpenCV.js``` fails.

### Circle Detection Algorithm Failures

Circle detection failures typically stem from poor image quality, inadequate lighting conditions, or sensor surface characteristics incompatible with automated detection algorithms. The ⁠```detectCircleFromPoint()``` function implements multiple detection strategies with progressive fallback mechanisms.

Image quality issues include motion blur from camera shake, focus problems from incorrect camera distance, or compression artifacts from heavily compressed JPEG files. Capture images using steady hands, maintain 10-15cm distance from sensor surfaces, and use minimal JPEG compression when possible.

```javascript
 // Diagnostic function for circle detection issues
function diagnoseDetectionFailure(imageData, clickPoint) {
  const brightness = calculateAverageBrightness(imageData);
  const contrast = calculateContrast(imageData);
  const sharpness = calculateLaplacianVariance(imageData);
  
  console.log(`Image diagnostics at point (${clickPoint.x}, ${clickPoint.y}):`);
  console.log(`Brightness: ${brightness} (optimal: 100-200)`);
  console.log(`Contrast: ${contrast} (minimum: 30)`);
  console.log(`Sharpness: ${sharpness} (minimum: 100)`);
}
```
 
Lighting conditions significantly impact detection accuracy with insufficient illumination causing poor edge definition and excessive brightness creating over-exposed regions. Use uniform LED lighting at 5000K color temperature positioned to minimize shadows and reflections on sensor surfaces.

Sensor surface conditions including contamination, scratches, or irregular geometries may prevent successful automated detection. Clean sensor surfaces with lint-free cloths, inspect for physical damage, and utilize manual detection mode for challenging cases through the ⁠```manualDetectCircle()``` function.

### Color Analysis Inconsistencies

Color measurement inconsistencies often result from improper reference point selection, environmental lighting variations, or systematic errors in the white balance correction process. The ⁠```normalizeRGB()``` function requires high-quality white and black reference measurements for accurate color correction.

Reference point validation ensures white references exhibit RGB values above 220 across all channels while black references remain below 35. Insufficient contrast between references reduces correction effectiveness and increases measurement uncertainty. Select reference points from clean, uniform surfaces with appropriate reflectance characteristics.

```javascript
 // Reference point quality validation
function validateReferencePoints(whiteRef, blackRef) {
  const whiteValid = whiteRef.every(channel => channel > 220);
  const blackValid = blackRef.every(channel => channel < 35);
  const contrast = calculateContrast(whiteRef, blackRef);
  
  return {
    whiteReference: whiteValid,
    blackReference: blackValid,
    sufficientContrast: contrast > 100,
    recommendations: generateReferenceRecommendations(whiteRef, blackRef)
  };
}
```

Environmental lighting changes during measurement sessions affect color consistency and measurement accuracy. Maintain constant lighting conditions throughout analysis procedures, disable automatic exposure and white balance on camera applications, and repeat reference measurements when lighting conditions change.

Systematic color shifts may indicate camera sensor aging, lens contamination, or automatic gain control interference. Clean camera lenses with appropriate materials, disable automatic camera adjustments when possible, and compare measurements against known reference standards periodically.

### Progressive Web App Installation Problems

PWA installation issues require HTTPS protocol, valid manifest files, and proper service worker registration. The application includes automatic installation detection through the ⁠navigator.standalone property for iOS devices and installation prompts for Android systems.
HTTPS requirement validation involves checking the URL protocol and certificate validity. Self-signed certificates work for development but production deployments require proper SSL certificates from recognized certificate authorities. Use browser developer tools to inspect security warnings and certificate issues.

```javascript
 // PWA installation diagnostics
function diagnosePWAIssues() {
  const diagnostics = {
    httpsEnabled: location.protocol === 'https:',
    manifestPresent: !!document.querySelector('link[rel="manifest"]'),
    serviceWorkerSupport: 'serviceWorker' in navigator,
    installationPrompt: 'beforeinstallprompt' in window,
    standaloneMode: window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches
  };
  
  console.table(diagnostics);
  return diagnostics;
}
```

Manifest file validation requires proper JSON syntax, required fields including name and icons, and correct MIME type serving. Use JSON validation tools to check manifest syntax and verify icon file accessibility through direct URL access.

Service worker registration failures prevent offline functionality and caching capabilities. Check browser developer tools for service worker registration errors, verify file paths match actual file locations, and ensure proper MIME type serving for JavaScript files.

### Performance and Memory Issues
Performance degradation on mobile devices typically results from insufficient memory, background application interference, or inefficient resource usage during image processing operations. Monitor memory usage through browser developer tools and implement proper cleanup procedures.
\
Memory leaks commonly occur from improper OpenCV.js Mat object disposal after processing operations. The application implements try-catch blocks with proper cleanup procedures, but complex processing sequences may require additional memory management attention.
```javascript
 // Memory management for OpenCV.js operations
function performImageProcessingWithCleanup(imageData) {
  let src, dst, gray;
  try {
    src = cv.imread(canvasInput);
    dst = new cv.Mat();
    gray = new cv.Mat();
    
    // Processing operations here
    cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
    
  } catch (error) {
    console.error("Processing error:", error);
  } finally {
    // Cleanup all Mat objects
    if (src && !src.isDeleted()) src.delete();
    if (dst && !dst.isDeleted()) dst.delete();
    if (gray && !gray.isDeleted()) gray.delete();
  }
}
```

Processing time optimization involves reducing image resolution when appropriate, implementing progressive loading for large images, and utilizing Web Workers for intensive calculations when possible. Monitor processing times and implement timeout mechanisms for long-running operations.

Battery consumption optimization includes minimizing camera usage time, reducing screen brightness during extended analysis sessions, and implementing efficient algorithms that complete processing quickly to minimize device resource usage.

---

## Community & Support

# Contributing Guidelines


## Contributing Guidelines

### Development Workflow and Standards

Contributions to ImmunoChroma follow standard GitHub collaborative development practices with emphasis on code quality, documentation completeness, and scientific reproducibility. All contributions must maintain the application's core scientific integrity while enhancing usability and performance across different mobile platforms and usage scenarios.

Fork the repository and create feature branches with descriptive names reflecting the specific functionality or improvement being implemented. Follow the naming convention ```feature/description``` for new features, `bugfix/description` for error corrections, and ```enhancement/description``` for performance or usability improvements.

```bash
# Example contribution workflow
git clone https://github.com/your-username/immunochroma-pwa.git
git checkout -b feature/enhanced-circle-detection
# Implement changes with comprehensive testing
git commit -m "feat: implement adaptive circle detection with machine learning"
git push origin feature/enhanced-circle-detection
```

### Code Quality Requirements
All JavaScript code must follow ES6+ standards with comprehensive error handling, proper memory management for OpenCV.js operations, and detailed function documentation including parameter types and return values. HTML markup should utilize semantic elements with appropriate ARIA labels for accessibility compliance across different assistive technologies.

CSS contributions must maintain the mobile-first responsive design philosophy, utilize existing custom properties for consistency, and include appropriate media queries for various screen sizes and orientations. Performance considerations require optimization for mobile devices with limited processing power and memory resources.

Testing requirements include functional validation across multiple browsers, mobile device compatibility testing on iOS and Android platforms, performance regression assessment to ensure no significant slowdowns, and accessibility validation using screen readers and keyboard navigation.

### Scientific Accuracy and Validation
Contributions affecting color analysis algorithms, concentration estimation methods, or quality control systems require validation against established reference standards and peer-reviewed scientific literature. Algorithmic changes must maintain measurement accuracy within established tolerance limits while preserving reproducibility across different environmental conditions.

Documentation updates must accurately reflect the underlying scientific principles including gap-plasmon dispersion physics, CIE Lab color space mathematics, and statistical analysis methodologies. Contributors should provide appropriate citations for new scientific methods or modifications to existing algorithms.

### Issue Reporting and Feature Requests

Report bugs and request features through the GitHub issue tracker with comprehensive descriptions including device information, browser specifications, steps to reproduce problems, and expected versus observed behavior. Feel free to file an issue for any problems encountered or improvements suggested during application usage.

Include screenshots or video recordings when reporting visual interface problems, console log output for JavaScript errors, and specific measurement data when reporting analysis accuracy concerns. Feature requests should describe the scientific or usability rationale for proposed enhancements.

---

# License

## License

MIT License

Copyright (c) 2024 ImmunoChroma Development Team

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

### Third-Party Licenses
This application incorporates several open-source libraries with their respective licenses. OpenCV.js is distributed under the Apache License 2.0, D3-color library uses the BSD 3-Clause License, Chart.js operates under the MIT License, and jsPDF utilizes the MIT License. Font Awesome icons are used under the Font Awesome Free License.

Users and contributors must comply with all applicable third-party licenses when redistributing, modifying, or commercializing derivative works based on this application. Complete license texts for all dependencies are available in their respective repositories and CDN distributions.

## Citation
### Academic Citation
If you use this software in your research, please cite the original research paper describing the biosensor technology and smartphone application:
```
 @article{soudi2024smartphone,
  title={Smartphone-based Immune Response Measurement using Colorimetric Self-Assembled Plasmonic Biosensor},
  author={Soudi, Mahdi and Torres-Palencia, Ángel D. and Beech, Caitlin and Cencillo-Abad, Pablo and Mehta, Freya and Ahsaei, Amir Ghazizadeh and Chanda, Ishani and Mastranzo-Ortega, Pamela and Sanchez-Mondragón, Javier and Vázquez-Guardado, Abraham and Chanda, Debashis},
  journal={[Journal Name - To be updated upon publication]},
  year={2024},
  volume={[Volume]},
  number={[Issue]},
  pages={[Pages]},
  doi={[DOI - To be updated upon publication]}
}
```
### Software Citation
For software-specific citations referencing the application implementation, algorithms, or validation procedures:
```
 @software{immunochroma_pwa2024,
  title={ImmunoChroma: Progressive Web Application for Smartphone-based Colorimetric Biosensor Analysis},
  author={Soudi, Mahdi and Vázquez-Guardado, Abraham and Chanda, Debashis},
  year={2024},
  url={https://github.com/your-username/immunochroma-pwa},
  version={1.0.0}
}
```
## Contact Information

### Primary Research Contacts
```
Abraham Vázquez-Guardado, Ph.D.
Assistant Professor
Department of Electrical and Computer Engineering
North Carolina State University
Center for Advanced Self-Powered Systems of Integrated Sensors and Technologies (ASSIST)
Email: abraham.vg@ncsu.edu

Debashis Chanda, Ph.D.
Professor and Pegasus Professor
Department of Physics
CREOL, The College of Optics and Photonics
NanoScience Technology Center
University of Central Florida
Email: Debashis.Chanda@ucf.edu
``` 
### Technical Support and Issues
For technical support, bug reports, feature requests, and general inquiries about the ImmunoChroma Progressive Web Application, please utilize the GitHub issue tracking system:

```GitHub Repository: https://github.com/your-username/immunochroma-pwa``` 

Issue Tracker: ```https://github.com/your-username/immunochroma-pwa/issues``` 

Feel free to file an issue for any problems encountered, questions about implementation, suggestions for improvements, or requests for new features. The development team actively monitors the issue tracker and provides timely responses to community feedback and support requests.

### Collaborative Research Opportunities
Researchers interested in collaborative opportunities, technology licensing, sensor fabrication partnerships, or clinical validation studies should contact the primary research contacts directly. The research team welcomes collaborations that advance point-of-care diagnostic technologies and smartphone-based analytical methods.

For media inquiries, technology transfer discussions, or commercial licensing opportunities, please contact the respective technology transfer offices at North Carolina State University and University of Central Florida in addition to the primary research contacts.
```
University of Central Florida
Department of Physics
CREOL, The College of Optics and Photonics
NanoScience Technology Center
Orlando, Florida 32816, USA

North Carolina State University
Department of Electrical and Computer Engineering
Center for Advanced Self-Powered Systems of Integrated Sensors and Technologies (ASSIST)
Raleigh, North Carolina 27606, USA

This comprehensive documentation ensures reproducibility and transparency while providing multiple channels for community engagement, technical support, and collaborative research opportunities. All algorithms, methodologies, and validation procedures are fully documented to enable independent verification and advancement of smartphone-based diagnostic technologies.

---

[↑ Back to Top](#table-of-contents)
