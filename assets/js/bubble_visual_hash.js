// Simple visual hash for publications without cover images
function hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return Math.abs(hash);
}

function generateBubbles(svg, id) {
    const hash = hashCode(id);
    const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe', '#43e97b', '#38f9d7'];
    
    // Clear existing content
    svg.innerHTML = '';
    
    // Create gradient background
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('width', '300');
    rect.setAttribute('height', '200');
    rect.setAttribute('fill', colors[hash % colors.length]);
    rect.setAttribute('opacity', '0.3');
    svg.appendChild(rect);
    
    // Add bubbles
    const numBubbles = 5 + (hash % 5);
    for (let i = 0; i < numBubbles; i++) {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', (hash * (i + 1) * 17) % 280 + 10);
        circle.setAttribute('cy', (hash * (i + 1) * 23) % 180 + 10);
        circle.setAttribute('r', 10 + (hash * (i + 1)) % 30);
        circle.setAttribute('fill', colors[(hash + i) % colors.length]);
        circle.setAttribute('opacity', '0.5');
        svg.appendChild(circle);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.bubble-visual-hash').forEach(function(svg) {
        const id = svg.getAttribute('data-bubble-visual-hash');
        if (id) {
            generateBubbles(svg, id);
        }
    });
});
