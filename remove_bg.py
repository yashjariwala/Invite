from PIL import Image

def process():
    try:
        img = Image.open("public/wax_seal.png").convert("RGBA")
        width, height = img.size
        pixels = img.load()
        
        for y in range(height):
            for x in range(width):
                r, g, b, a = pixels[x, y]
                # Calculate distance from pure white
                dist = ((255-r)**2 + (255-g)**2 + (255-b)**2)**0.5
                
                # If it's pure white or very close (within a radius of ~45 RGB distance)
                if dist < 45:
                    # Make perfectly transparent
                    pixels[x, y] = (r, g, b, 0)
                elif dist < 70:
                    # Feather the edges for anti-aliasing
                    alpha = int(((dist - 45) / 25.0) * 255)
                    pixels[x, y] = (r, g, b, alpha)
                
        img.save("public/wax_seal_transparent.png", "PNG")
        print("Successfully created wax_seal_transparent.png")
    except Exception as e:
        print(f"Error: {e}")

process()
