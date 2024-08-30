const container = document.getElementById('head-container');
const scene = new THREE.Scene();
width = 2;
height = 2;
const camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 100);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(100, 100);
container.appendChild(renderer.domElement);
let head;
let head_outer;
function loadSkin() {
    const skinUrl = document.getElementById('url').value;
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(skinUrl, function (texture) {
        if (head) {
            scene.remove(head);
            scene.remove(head_outer);
        }

        texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.LinearMipMapLinearFilter;

        // Adjust texture coordinates for each face
        const faceWidth = 8 / 64;  // Width of one face in UV space
        const faceHeight = 8 / 64; // Height of one face in UV space

        const head_uv_map = [
            // Left face
            new THREE.Vector2(2 * faceWidth, 7 * faceWidth),
            new THREE.Vector2(3 * faceWidth, 7 * faceWidth),
            new THREE.Vector2(2 * faceWidth, 6 * faceWidth),
            new THREE.Vector2(3 * faceWidth, 6 * faceWidth),

            // Right face
            new THREE.Vector2(0 * faceWidth, 7 * faceWidth),
            new THREE.Vector2(1 * faceWidth, 7 * faceWidth),
            new THREE.Vector2(0 * faceWidth, 6 * faceWidth),
            new THREE.Vector2(1 * faceWidth, 6 * faceWidth),

            // Top face
            new THREE.Vector2(1 * faceWidth, 8 * faceWidth),
            new THREE.Vector2(2 * faceWidth, 8 * faceWidth),
            new THREE.Vector2(1 * faceWidth, 7 * faceWidth),
            new THREE.Vector2(2 * faceWidth, 7 * faceWidth),

            // Bottom face
            new THREE.Vector2(2 * faceWidth, 8 * faceWidth),
            new THREE.Vector2(3 * faceWidth, 8 * faceWidth),
            new THREE.Vector2(2 * faceWidth, 7 * faceWidth),
            new THREE.Vector2(3 * faceWidth, 7 * faceWidth),

            // Front face
            new THREE.Vector2(1 * faceWidth, 7 * faceWidth),
            new THREE.Vector2(2 * faceWidth, 7 * faceWidth),
            new THREE.Vector2(1 * faceWidth, 6 * faceWidth),
            new THREE.Vector2(2 * faceWidth, 6 * faceWidth),

            // Back face
            new THREE.Vector2(3 * faceWidth, 7 * faceWidth),
            new THREE.Vector2(4 * faceWidth, 7 * faceWidth),
            new THREE.Vector2(3 * faceWidth, 6 * faceWidth),
            new THREE.Vector2(4 * faceWidth, 6 * faceWidth),
        ];

        const head_outer_uv_map = [
            // Left face
            new THREE.Vector2(6 * faceWidth, 7 * faceWidth),
            new THREE.Vector2(7 * faceWidth, 7 * faceWidth),
            new THREE.Vector2(6 * faceWidth, 6 * faceWidth),
            new THREE.Vector2(7 * faceWidth, 6 * faceWidth),

            // Right face
            new THREE.Vector2(4 * faceWidth, 7 * faceWidth),
            new THREE.Vector2(5 * faceWidth, 7 * faceWidth),
            new THREE.Vector2(4 * faceWidth, 6 * faceWidth),
            new THREE.Vector2(5 * faceWidth, 6 * faceWidth),

            // Top face
            new THREE.Vector2(5 * faceWidth, 8 * faceWidth),
            new THREE.Vector2(6 * faceWidth, 8 * faceWidth),
            new THREE.Vector2(5 * faceWidth, 7 * faceWidth),
            new THREE.Vector2(6 * faceWidth, 7 * faceWidth),

            // Bottom face
            new THREE.Vector2(6 * faceWidth, 8 * faceWidth),
            new THREE.Vector2(7 * faceWidth, 8 * faceWidth),
            new THREE.Vector2(6 * faceWidth, 7 * faceWidth),
            new THREE.Vector2(7 * faceWidth, 7 * faceWidth),

            // Front face
            new THREE.Vector2(5 * faceWidth, 7 * faceWidth),
            new THREE.Vector2(6 * faceWidth, 7 * faceWidth),
            new THREE.Vector2(5 * faceWidth, 6 * faceWidth),
            new THREE.Vector2(6 * faceWidth, 6 * faceWidth),

            // Back face
            new THREE.Vector2(7 * faceWidth, 7 * faceWidth),
            new THREE.Vector2(8 * faceWidth, 7 * faceWidth),
            new THREE.Vector2(7 * faceWidth, 6 * faceWidth),
            new THREE.Vector2(8 * faceWidth, 6 * faceWidth),
        ];

        // Create a 3D head using a box geometry
        const headGeometry = new THREE.BoxGeometry();
        const headOuterGeometry = new THREE.BoxGeometry();
        const head_uv = headGeometry.attributes.uv;
        const head_outer_uv = headOuterGeometry.attributes.uv;
        
        for (let i = 0; i < head_uv.count; i++) {
            head_uv.setXY(i, head_uv_map[i].x, head_uv_map[i].y);
            head_outer_uv.setXY(i, head_outer_uv_map[i].x, head_outer_uv_map[i].y);
        }
        head_uv.needsUpdate = true;
        head_outer_uv.needsUpdate = true;

        const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
        head = new THREE.Mesh(headGeometry, material);
        head_outer = new THREE.Mesh(headOuterGeometry, material);
        head_outer.scale.set(1.1, 1.1, 1.1); // Slightly larger than the head
        scene.add(head);
        scene.add(head_outer);

        head.position.set(0, 0, 0);
        head_outer.position.set(0, 0, 0);
        camera.position.set(1.5, 1.5, 2.5); // Adjusted camera position to better view the top
        camera.lookAt(0, 0, 0);
    });
}

function animate() {
    requestAnimationFrame(animate);
    if (head) {
        head.rotation.y += 0.01;
        head_outer.rotation.y += 0.01;
    }
    renderer.render(scene, camera);
}
animate();