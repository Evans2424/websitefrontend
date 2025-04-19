/**
 * Facebook Gallery Integration Service
 *
 * This service handles the integration with Facebook to fetch photos from TEUP's page.
 * Using the Facebook Graph API to access public photos from the page.
 */

interface FacebookPhoto {
  id: string;
  source: string; // URL of the photo
  created_time: string;
  alt_text?: string;
  link: string;
}

interface FacebookAlbum {
  id: string;
  name: string;
  cover_photo: {
    id: string;
    source: string;
  };
  count: number;
  created_time: string;
}

// Your Facebook App credentials should be stored in environment variables
const PAGE_ID = 'teupofficial'; // TEUP's official Facebook page ID/username
const PAGE_ACCESS_TOKEN = process.env.FACEBOOK_PAGE_ACCESS_TOKEN; // Store this securely in your .env file

// Function to fetch photos from specific albums or the page's photos
export async function fetchFacebookPhotos(limit: number = 30, albumId?: string): Promise<FacebookPhoto[]> {
  // In a real implementation, you would:
  // 1. Use a Page Access Token with appropriate permissions
  // 2. Call the Facebook Graph API with that token
  
  // This is a mock implementation for development
  // In production, replace this with real Facebook Graph API calls
  
  try {
    // Real implementation would be:
    // const endpoint = albumId 
    //   ? `https://graph.facebook.com/v18.0/${albumId}/photos`
    //   : `https://graph.facebook.com/v18.0/${PAGE_ID}/photos`;
    // 
    // const response = await fetch(
    //   `${endpoint}?fields=id,source,link,created_time,alt_text&limit=${limit}&access_token=${PAGE_ACCESS_TOKEN}`
    // );
    // const data = await response.json();
    // return data.data.map((photo: any) => ({
    //   id: photo.id,
    //   source: photo.source,
    //   created_time: photo.created_time,
    //   alt_text: photo.alt_text || '',
    //   link: photo.link || `https://facebook.com/${PAGE_ID}/photos/${photo.id}`
    // }));
    
    // Instead, we return mock data based on the existing images
    const mockPhotos: FacebookPhoto[] = [
      {
        id: '1',
        source: '/images/teup-flag-performance.png',
        created_time: '2025-04-12T10:30:00+0000',
        alt_text: 'TEUP performance with flag',
        link: 'https://facebook.com/teupofficial/photos/1'
      },
      {
        id: '2',
        source: '/images/teup-dance-performance.png',
        created_time: '2025-03-25T18:45:00+0000',
        alt_text: 'TEUP dance performance',
        link: 'https://facebook.com/teupofficial/photos/2'
      },
      {
        id: '3',
        source: '/images/teup-jump-performance.png',
        created_time: '2025-02-14T20:15:00+0000',
        alt_text: 'TEUP members jumping during performance',
        link: 'https://facebook.com/teupofficial/photos/3'
      },
      {
        id: '4',
        source: '/images/teup-musicians.png',
        created_time: '2025-01-30T19:00:00+0000',
        alt_text: 'TEUP musicians playing instruments',
        link: 'https://facebook.com/teupofficial/photos/4'
      },
      {
        id: '5',
        source: '/images/teup-nice.png',
        created_time: '2024-12-05T14:20:00+0000',
        alt_text: 'TEUP in Nice, France',
        link: 'https://facebook.com/teupofficial/photos/5'
      },
      {
        id: '6',
        source: '/images/teup-night-view.png',
        created_time: '2024-11-18T21:30:00+0000',
        alt_text: 'TEUP at night with city view',
        link: 'https://facebook.com/teupofficial/photos/6'
      },
      {
        id: '7',
        source: '/images/teup-outdoor.png',
        created_time: '2024-10-22T16:45:00+0000',
        alt_text: 'TEUP group photo outdoors',
        link: 'https://facebook.com/teupofficial/photos/7'
      },
      {
        id: '8',
        source: '/images/teup-university.png',
        created_time: '2024-09-14T11:10:00+0000',
        alt_text: 'TEUP in front of university building',
        link: 'https://facebook.com/teupofficial/photos/8'
      },
      {
        id: '9',
        source: '/images/teup-casual.png',
        created_time: '2024-08-30T13:25:00+0000',
        alt_text: 'TEUP members in casual setting',
        link: 'https://facebook.com/teupofficial/photos/9'
      },
      {
        id: '10',
        source: '/images/teup-performance.png',
        created_time: '2024-07-22T20:15:00+0000',
        alt_text: 'TEUP performance',
        link: 'https://facebook.com/teupofficial/photos/10'
      },
      {
        id: '11',
        source: '/images/teup-meeting-room.png',
        created_time: '2024-06-18T17:40:00+0000',
        alt_text: 'TEUP meeting room',
        link: 'https://facebook.com/teupofficial/photos/11'
      },
      {
        id: '12',
        source: '/images/teup-flag-performance.png',
        created_time: '2024-05-05T19:30:00+0000',
        alt_text: 'TEUP festival performance',
        link: 'https://facebook.com/teupofficial/photos/12'
      }
    ];
    
    return mockPhotos.slice(0, limit);
  } catch (error) {
    console.error('Error fetching Facebook photos:', error);
    return [];
  }
}

// Function to fetch albums
export async function fetchFacebookAlbums(limit: number = 10): Promise<FacebookAlbum[]> {
  // Mock implementation
  try {
    // Real implementation would be:
    // const response = await fetch(
    //   `https://graph.facebook.com/v18.0/${PAGE_ID}/albums?fields=id,name,cover_photo{id,source},count,created_time&limit=${limit}&access_token=${PAGE_ACCESS_TOKEN}`
    // );
    // const data = await response.json();
    // return data.data;
    
    const mockAlbums: FacebookAlbum[] = [
      {
        id: 'album1',
        name: 'Atuações 2025',
        cover_photo: {
          id: '1',
          source: '/images/teup-flag-performance.png'
        },
        count: 15,
        created_time: '2025-01-01T00:00:00+0000'
      },
      {
        id: 'album2',
        name: 'Festival de Tunas 2025',
        cover_photo: {
          id: '3',
          source: '/images/teup-jump-performance.png'
        },
        count: 24,
        created_time: '2025-03-15T00:00:00+0000'
      },
      {
        id: 'album3',
        name: 'Viagem a Nice',
        cover_photo: {
          id: '5',
          source: '/images/teup-nice.png'
        },
        count: 32,
        created_time: '2024-12-05T00:00:00+0000'
      },
      {
        id: 'album4',
        name: 'Ensaios 2024',
        cover_photo: {
          id: '11',
          source: '/images/teup-meeting-room.png'
        },
        count: 18,
        created_time: '2024-06-18T00:00:00+0000'
      }
    ];
    
    return mockAlbums.slice(0, limit);
  } catch (error) {
    console.error('Error fetching Facebook albums:', error);
    return [];
  }
}

/**
 * SETUP INSTRUCTIONS FOR FACEBOOK API INTEGRATION:
 * 
 * 1. Create a Facebook App:
 *    - Go to developers.facebook.com and create a new app
 *    - Choose "Business" as the app type
 * 
 * 2. Add the "Facebook Login" product to your app
 *    - Configure settings for your domain
 * 
 * 3. Generate a Page Access Token:
 *    - Navigate to "Tools" > "Graph API Explorer"
 *    - Select your app from the dropdown
 *    - Select the TEUP Facebook page from the "Page" dropdown
 *    - Click "Generate Access Token"
 *    - Select the necessary permissions: pages_read_engagement, pages_read_user_content
 *    
 * 4. Get a Long-Lived Page Access Token:
 *    - Short-lived tokens expire quickly; convert yours to a long-lived token
 *    - Follow Facebook's documentation for extending token expiration
 *    - This can typically be done with an API call to:
 *      https://graph.facebook.com/v18.0/oauth/access_token?grant_type=fb_exchange_token&client_id={app-id}&client_secret={app-secret}&fb_exchange_token={short-lived-token}
 * 
 * 5. Store the long-lived Page Access Token:
 *    - Add it to your environment variables as FACEBOOK_PAGE_ACCESS_TOKEN
 *    - Never expose this token in client-side code
 *    - Consider implementing a backend service to handle Facebook API calls
 * 
 * 6. Update this service:
 *    - Uncomment the real implementation code above
 *    - Remove the mock data implementation
 * 
 * Note: Page Access Tokens for published apps may expire after around 60 days.
 * You may need to implement a token refresh mechanism for long-term use.
 */