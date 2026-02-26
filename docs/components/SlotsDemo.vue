<script setup lang="ts">
import { reactive, ref } from 'vue'
import { VuePDFjs } from '../../packages/vue'
import '../../packages/vue/dist/style.css'
import enUS_FTL from '../../packages/vue/dist/l10n/en-US/viewer.ftl?raw'
import type { VuePDFjsProps } from '../../packages/vue/dist/src/components/VuePDFjs.vue';

// Options for PDF viewer
const options = reactive<NonNullable<VuePDFjsProps['options']>>({
    locale: {
        code: 'en-US',
        ftl: enUS_FTL
    }
})

// Loading state demo controls
const isLoading = ref(true)
const loadingStyle = ref('simple')
const loadingDelay = ref(3)

// Trigger PDF loading
const pdf = ref<string | null>(null)

// Load PDF with artificial delay to demonstrate loading slot
function loadPdf() {
    // Prima imposta a null per attivare lo stato di caricamento
    pdf.value = null

    // Force a reset of the component's loading state
    isLoading.value = true
    
    // Add artificial delay to show loading indicator
    setTimeout(() => {
        // Imposta l'URL del PDF dopo il ritardo
        pdf.value = 'https://raw.githubusercontent.com/mozilla/pdf.js/v5.4.624/web/compressed.tracemonkey-pldi-09.pdf'
    }, loadingDelay.value * 1000)
}

// Load PDF initially with delay
loadPdf()
</script>

<template>
    <div class="slots-demo">
        <div class="controls">
            <h3>Loading Slot Demonstration</h3>
            <p>Choose a loading style and trigger PDF loading to see the loading slot in action.</p>
            
            <div class="control-group">
                <div class="radio-group">
                    <label>
                        <input type="radio" v-model="loadingStyle" value="simple">
                        Simple Text
                    </label>
                    <label>
                        <input type="radio" v-model="loadingStyle" value="spinner">
                        Spinner
                    </label>
                    <label>
                        <input type="radio" v-model="loadingStyle" value="progress">
                        Progress Bar
                    </label>
                    <label>
                        <input type="radio" v-model="loadingStyle" value="custom">
                        Custom Styled
                    </label>
                </div>
                
                <div class="delay-control">
                    <label>Loading Delay: {{ loadingDelay }} seconds</label>
                    <input type="range" v-model.number="loadingDelay" min="1" max="5" step="1">
                </div>
                
                <button @click="loadPdf" class="load-btn">Reload PDF with Delay</button>
            </div>
        </div>
        
        <div class="pdf-container">            <VuePDFjs 
                :source="pdf" 
                :options="options" 
                :key="isLoading ? 'loading' : 'loaded'"
            >
                <template #loading>
                    <!-- Simple loading text -->
                    <div v-if="loadingStyle === 'simple'" class="loading-simple">
                        Loading PDF document...
                    </div>
                    
                    <!-- Spinner loading style -->
                    <div v-else-if="loadingStyle === 'spinner'" class="loading-spinner">
                        <div class="spinner"></div>
                        <div class="spinner-text">Loading your document</div>
                    </div>
                    
                    <!-- Progress bar style -->
                    <div v-else-if="loadingStyle === 'progress'" class="loading-progress">
                        <div class="progress-bar">
                            <div class="progress-fill"></div>
                        </div>
                        <div class="progress-text">PDF loading, please wait...</div>
                    </div>
                    
                    <!-- Custom styled loading -->
                    <div v-else class="loading-custom">
                        <div class="custom-icon">
                            <svg viewBox="0 0 24 24" width="64" height="64">
                                <path fill="#4285f4" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                                <path fill="#4285f4" d="M 12,2 V 4 C 7.59,4 4,7.59 4,12 H 2 C 2,6.48 6.48,2 12,2 Z">
                                    <animateTransform 
                                        attributeName="transform" 
                                        type="rotate"
                                        from="0 12 12"
                                        to="360 12 12" 
                                        dur="1.5s" 
                                        repeatCount="indefinite" 
                                    />
                                </path>
                            </svg>
                        </div>
                        <div class="custom-text">
                            <h3>Preparing your document</h3>
                            <p>This may take a few moments...</p>
                        </div>
                    </div>
                </template>
            </VuePDFjs>
        </div>
    </div>
</template>

<style>
.slots-demo {
    display: flex;
    flex-direction: column;
    height: 650px;
    width: 100%;
}

.controls {
    padding: 15px;
    background-color: var(--vp-c-bg-soft);
    border-bottom: 1px solid var(--vp-c-divider);
}

.controls h3 {
    margin-top: 0;
    margin-bottom: 10px;
    color: var(--vp-c-text-1);
}

.controls p {
    margin-top: 0;
    color: var(--vp-c-text-2);
}

.control-group {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-top: 15px;
}

.radio-group {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
}

.radio-group label {
    display: flex;
    align-items: center;
    gap: 5px;
    color: var(--vp-c-text-1);
}

.delay-control {
    display: flex;
    flex-direction: column;
    gap: 5px;
    color: var(--vp-c-text-1);
}

.load-btn {
    padding: 8px 16px;
    background-color: var(--vp-c-brand);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    align-self: flex-start;
}

.load-btn:hover {
    background-color: var(--vp-c-brand-dark);
}

.pdf-container {
    flex: 1;
    min-height: 0;
    position: relative;
}

/* Loading indicator styles */
.loading-simple {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.9);
    position: absolute;
    font-size: 18px;
    color: #666;
}

.loading-spinner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.9);
    position: absolute;
}

.spinner {
    width: 50px;
    height: 50px;
    border: 5px solid #f3f3f3;
    border-top: 5px solid #4285f4;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

.spinner-text {
    margin-top: 15px;
    font-size: 16px;
    color: #333;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.loading-progress {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.9);
    position: absolute;
}

.progress-bar {
    width: 60%;
    height: 8px;
    background-color: #e0e0e0;
    border-radius: 4px;
    overflow: hidden;
    position: relative;
}

.progress-fill {
    height: 100%;
    width: 30%;
    background-color: #4285f4;
    border-radius: 4px;
    position: absolute;
    left: 0;
    animation: loading 2s infinite ease-in-out;
}

@keyframes loading {
    0% { width: 0%; left: 0; }
    50% { width: 30%; }
    100% { width: 0%; left: 100%; }
}

.progress-text {
    margin-top: 15px;
    font-size: 16px;
    color: #333;
}

.loading-custom {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    position: absolute;
    color: white;
}

.custom-text {
    text-align: center;
    margin-top: 20px;
}

.custom-text h3 {
    margin: 0;
    margin-bottom: 5px;
    font-size: 20px;
}

.custom-text p {
    margin: 0;
    opacity: 0.8;
}
</style>
