import sys
try:
    from PIL import Image, ImageDraw
except ImportError:
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow"])
    from PIL import Image, ImageDraw

def remove_outer_white(input_path, output_path):
    # Open image and convert to RGBA
    img = Image.open(input_path).convert("RGBA")
    
    # We will floodfill from the top-left corner (0,0).
    # Floodfill requires an RGB or L image, so we draw on a mask or we fill directly and use transparency.
    # The floodfill fills contiguous pixels with a specified color.
    # Let's floodfill with transparent (0, 0, 0, 0).
    
    # In Pillow, floodfill works perfectly on RGBA
    # But JPGS have artifacts, so we use a threshold (thresh).
    # ImageDraw.floodfill supports exact matching. For tolerance, it's better to use a loop or just rely on the background being purely white or near white.
    # Actually, let's just make all pixels that are > 240, 240, 240 transparent, and hope the inside triangle is slightly less white, 
    # OR we can just write a quick BFS from (0,0) with tolerance.
    
    width, height = img.size
    pixels = img.load()
    
    # BFS to find outer white
    visited = set()
    queue = [(0, 0), (width-1, 0), (0, height-1), (width-1, height-1)]
    
    # Add borders
    for x in range(width):
        queue.append((x, 0))
        queue.append((x, height-1))
    for y in range(height):
        queue.append((0, y))
        queue.append((width-1, y))
        
    while queue:
        x, y = queue.pop(0)
        if (x, y) in visited:
            continue
        visited.add((x, y))
        
        r, g, b, a = pixels[x, y]
        # Tolerance for JPG artifacts near white
        if r > 230 and g > 230 and b > 230 and a > 0:
            pixels[x, y] = (255, 255, 255, 0)
            
            # Add neighbors
            for dx, dy in [(0, 1), (1, 0), (0, -1), (-1, 0)]:
                nx, ny = x + dx, y + dy
                if 0 <= nx < width and 0 <= ny < height:
                    queue.append((nx, ny))
                    
    img.save(output_path, "PNG")
    print("SUCCESS")

remove_outer_white(sys.argv[1], sys.argv[2])
